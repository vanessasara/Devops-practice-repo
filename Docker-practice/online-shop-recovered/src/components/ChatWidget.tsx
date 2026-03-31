'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import {
    MessageCircle,
    X,
    Send,
    Loader2,
    ArrowDownCircleIcon,
    Sparkles,
} from 'lucide-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function ChatWidget() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [input, setInput] = useState('');
    const [quickQuestions, setQuickQuestions] = useState<string[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Determine page type from pathname
    const getPageType = (path: string): string => {
        if (path.startsWith('/products/')) return 'product';
        if (path === '/products') return 'products';
        if (path === '/about') return 'about';
        if (path === '/contact') return 'contact';
        if (path === '/') return 'home';
        return 'default';
    };

    const pageType = getPageType(pathname);

    const { messages, sendMessage, status, error, stop } = useChat({
        api: `${API_URL}/api/chat`,
        id: sessionId || undefined,
    });

    // Generate session ID on first load
    useEffect(() => {
        if (!sessionId) {
            const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            setSessionId(newSessionId);
        }
    }, []);

    // Fetch quick questions when chat opens
    useEffect(() => {
        if (isChatOpen && quickQuestions.length === 0) {
            fetchQuickQuestions();
        }
    }, [isChatOpen, pathname]);

    // Fetch quick questions from backend
    const fetchQuickQuestions = async () => {
        setIsLoadingQuestions(true);
        try {
            const response = await fetch(
                `${API_URL}/api/quick-questions?page_type=${pageType}`
            );
            if (response.ok) {
                const data = await response.json();
                setQuickQuestions(data.questions || []);
            }
        } catch (err) {
            console.error('Failed to fetch quick questions:', err);
            // Fallback questions
            setQuickQuestions([
                'What makes Sony Interior unique?',
                'Show me your featured products',
                'Help me find furniture',
            ]);
        } finally {
            setIsLoadingQuestions(false);
        }
    };

    // Handle text selection on page
    useEffect(() => {
        const handleTextSelection = () => {
            const selection = window.getSelection();
            if (selection && selection.toString().trim()) {
                setSelectedText(selection.toString().trim());
            }
        };

        document.addEventListener('mouseup', handleTextSelection);
        document.addEventListener('touchend', handleTextSelection);

        return () => {
            document.removeEventListener('mouseup', handleTextSelection);
            document.removeEventListener('touchend', handleTextSelection);
        };
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        const messageText = input;
        setInput('');

        // Build context for the message
        const context = {
            page_context: pathname,
            selected_text: selectedText,
        };

        try {
            await sendMessage({
                text: messageText,
                sessionId: sessionId || undefined,
                context,
            });

            // Clear selected text after sending
            if (selectedText) {
                setSelectedText(null);
            }
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const handleQuickQuestion = (question: string) => {
        setInput(question);
        // Auto-submit after setting input
        setTimeout(() => {
            const form = document.getElementById('chat-form');
            if (form) {
                form.dispatchEvent(new Event('submit', { bubbles: true }));
            }
        }, 100);
    };

    const toggleChat = () => setIsChatOpen((prev) => !prev);

    return (
        <div>
            {/* Floating Chat Icon */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 right-4 z-50"
            >
                <Button
                    onClick={toggleChat}
                    className="rounded-full p-4 shadow-lg bg-blue-600 hover:bg-blue-700 text-white size-14 flex items-center justify-center"
                >
                    {!isChatOpen ? (
                        <MessageCircle className="size-6" />
                    ) : (
                        <ArrowDownCircleIcon className="size-6" />
                    )}
                </Button>
            </motion.div>

            {/* Chat Box */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[420px]"
                    >
                        <Card className="border-2 border-zinc-200 shadow-xl rounded-2xl bg-white/95 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <CardTitle className="text-lg font-bold text-zinc-800">
                                            SonyInterior Assistant
                                        </CardTitle>
                                        <span className="absolute -top-1 -right-3">
                                            <Sparkles className="size-3 text-blue-500" />
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={toggleChat}
                                    size="sm"
                                    variant="ghost"
                                    className="rounded-full p-2 hover:bg-zinc-100"
                                >
                                    <X className="size-5 text-zinc-600" />
                                    <span className="sr-only">Close chat</span>
                                </Button>
                            </CardHeader>

                            <CardContent>
                                <ScrollArea className="h-[280px] pr-3">
                                    {selectedText && (
                                        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                                            <span className="font-medium">Selected:</span> "{selectedText.substring(0, 100)}
                                            {selectedText.length > 100 ? '...' : ''}"
                                        </div>
                                    )}

                                    {error && (
                                        <div className="text-red-500 text-sm mb-2 p-2 bg-red-50 rounded-lg">
                                            {error.message}
                                        </div>
                                    )}

                                    {messages.length === 0 && (
                                        <div className="w-full text-center text-zinc-400 py-8">
                                            <Sparkles className="size-8 mx-auto mb-2 text-zinc-300" />
                                            <p className="text-sm">Ask me about furniture!</p>
                                            <p className="text-xs mt-1">I can help you find the perfect pieces</p>
                                        </div>
                                    )}

                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'
                                                }`}
                                        >
                                            <div
                                                className={`inline-block px-3 py-2 rounded-2xl text-sm max-w-[85%] ${message.role === 'user'
                                                        ? 'bg-blue-600 text-white ml-auto'
                                                        : 'bg-zinc-100 text-zinc-800'
                                                    }`}
                                            >
                                                {message.parts.map((part, i) => {
                                                    if (part.type === "text") {
                                                        return (
                                                            <div key={i} className="whitespace-pre-wrap">
                                                                {part.text}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}

                                            </div>
                                        </div>
                                    ))}

                                    {(status === 'submitted' || status === 'streaming') && (
                                        <div className="flex items-center justify-start gap-2 mt-3 text-zinc-500">
                                            <Loader2 className="animate-spin size-4" />
                                            <span>AI is thinking...</span>
                                            <button
                                                onClick={stop}
                                                className="ml-auto text-xs underline text-red-500"
                                            >
                                                Stop
                                            </button>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </ScrollArea>

                                {/* Quick Questions */}
                                {messages.length === 0 && quickQuestions.length > 0 && (
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-xs text-zinc-500 mb-2">Quick questions:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {isLoadingQuestions ? (
                                                <span className="text-xs text-zinc-400">Loading...</span>
                                            ) : (
                                                quickQuestions.slice(0, 3).map((question, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleQuickQuestion(question)}
                                                        className="text-xs px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-full transition-colors"
                                                    >
                                                        {question}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="border-t pt-3" id="chat-form">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex w-full items-center space-x-2"
                                >
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about furniture designs..."
                                        className="flex-1"
                                    />
                                    <Button
                                        type="submit"
                                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                                        disabled={status === 'submitted' || status === 'streaming'}
                                        size="icon"
                                    >
                                        <Send className="size-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
