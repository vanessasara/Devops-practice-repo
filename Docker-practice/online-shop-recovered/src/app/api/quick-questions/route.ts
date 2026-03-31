const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('page_type') || 'default';

    // Call Python backend
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/quick-questions?page_type=${pageType}`);

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Quick questions API error:", error);
    // Return fallback questions
    return Response.json({
      questions: [
        "Help me find the perfect furniture",
        "What are your featured products?",
        "Tell me about your company",
        "What categories do you offer?",
        "How can I contact you?"
      ]
    });
  }
}
