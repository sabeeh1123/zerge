import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini client with proper telemetry headers
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// High-fidelity fallback recommendations representing highly optimized Zerge-style editorial content
const FALLBACK_RECOMMENDATIONS = [
  {
    title: "Waveform: The MKBHD Podcast",
    creator: "Marques Brownlee & Andrew Manganelli",
    type: "podcast",
    rating: 9.3,
    vergeScore: 9.2,
    description: "A definitive deep-dive into the consumer electronics ecosystem, breaking down the finest details of modern smartphones, smart cars, and the underlying AI wave.",
    whyWeRecommend: "Waveform blends Marque's unparalleled tech expertise with direct, casual banter that keeps complex consumer tech topics accessible, fun, and highly relevant.",
    genre: "Technology",
    duration: "65m average",
    released: "2026",
    whereToFind: "Spotify, Apple Podcasts, YouTube",
    seedKeyword: "tech_podcast_studio",
    tags: ["tech", "reviews", "gadgets", "mkbhd"]
  },
  {
    title: "Severance (Season 2)",
    creator: "Ben Stiller & Dan Erickson",
    type: "movie",
    rating: 9.6,
    vergeScore: 9.5,
    description: "The dystopian office-thriller reaches breathtaking heights as Mark Scout explores the terrifying depths of Lumon Industries' severed department and the corporate espionage surrounding it.",
    whyWeRecommend: "Every frame is an eerie visual masterpiece. The pacing, brutalist set designs, and terrifyingly cold corporate horror make it the pinnacle of speculative television.",
    genre: "Sci-Fi / Thriller",
    duration: "1h 5m per episode",
    released: "2025",
    whereToFind: "Apple TV+",
    seedKeyword: "brutalist_office_cold",
    tags: ["corporate", "dystopian", "mystery", "thriller"]
  },
  {
    title: "Lex Fridman Podcast",
    creator: "Lex Fridman",
    type: "podcast",
    rating: 9.1,
    vergeScore: 8.8,
    description: "Engaging, multi-hour discussions with the world's leading minds across artificial intelligence, advanced physics, political philosophy, sports, and human history.",
    whyWeRecommend: "Lex's distinctively calm, empathetic and open posture allows complex experts to articulate philosophical ideas with immense depth and without modern soundbite rush.",
    genre: "Society & Science",
    duration: "180m average",
    released: "2026",
    whereToFind: "Spotify, Apple Podcasts, YouTube",
    seedKeyword: "ai_science_philosophy",
    tags: ["science", "philosophy", "ai", "deep_interviews"]
  },
  {
    title: "Dune: Part Two",
    creator: "Denis Villeneuve",
    type: "movie",
    rating: 9.5,
    vergeScore: 9.6,
    description: "Paul Atreides unites with Chani and the Fremen to wage a war of survival and cosmic vengeance against the conspirators who destroyed his noble house.",
    whyWeRecommend: "With visual mastery and awe-inspiring soundscapes, Denis Villeneuve has crafted an epic that rivals the gold standard of space blockbusters, setting a new bar for modern sci-fi.",
    genre: "Epic Sci-Fi / Action",
    duration: "2h 46m",
    released: "2024",
    whereToFind: "Max, Prime Video",
    seedKeyword: "desert_planet_spice",
    tags: ["epic_sci_fi", "space_desert", "paul_atreides", "soundtrack"]
  },
  {
    title: "Darknet Diaries",
    creator: "Jack Rhysider",
    type: "podcast",
    rating: 9.4,
    vergeScore: 9.1,
    description: "Thrilling, investigative first-hand accounts from the dark side of the internet, featuring white-hat hackers, state-sponsored cyber warfare, ransomware negotiators, and rogue operations.",
    whyWeRecommend: "Rhysider translates high-tech security concepts into cinematic, audio-driven heist stories that read like digital thriller novels. A must-listen for anyone living on the grid.",
    genre: "Cybersecurity",
    duration: "55m average",
    released: "2025",
    whereToFind: "Spotify, Apple Podcasts, Overcast",
    seedKeyword: "hacker_neon_command",
    tags: ["hacking", "cybercrime", "tech_culture", "suspense"]
  },
  {
    title: "Everything Everywhere All at Once",
    creator: "Daniel Kwan & Daniel Scheinert",
    type: "movie",
    rating: 9.2,
    vergeScore: 9.3,
    description: "An aging Chinese immigrant is swept up in an insane adventure, in which she alone can save the universe by connecting with alternate lives she could have led in the multiverse.",
    whyWeRecommend: "A brilliant blend of genre-fluid action, gorgeous chaotic pacing, deep familial warmth, and absurd humor that reinvents the tired concept of multi-dimensional cinema.",
    genre: "Sci-Fi / Comedy",
    duration: "2h 19m",
    released: "2022",
    whereToFind: "A24, Prime Video",
    seedKeyword: "multiverse_googly_eye",
    tags: ["multiverse", "family_drama", "a24", "martial_arts"]
  },
  {
    title: "The Daily",
    creator: "The New York Times",
    type: "podcast",
    rating: 9.0,
    vergeScore: 8.7,
    description: "The definitive daily news podcast that goes deep into the biggest stories of our time, driven by high-authority reporting from the world's premier journalists.",
    whyWeRecommend: "Instead of summarizing the news, The Daily chooses a single primary headline, placing human narratives and investigative rigor in focus for a fast-paced overview of world events.",
    genre: "News & Politics",
    duration: "25m average",
    released: "2026",
    whereToFind: "Spotify, Apple Podcasts",
    seedKeyword: "newsroom_microphone_studio",
    tags: ["news", "investigation", "daily", "politics"]
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    creator: "Kemp Powers, Joaquim Dos Santos, Justin K. Thompson",
    type: "movie",
    rating: 9.4,
    vergeScore: 9.4,
    description: "Miles Morales catapults across the Multiverse, where he encounters a society of Spider-People charged with protecting its very existence, only to clash on how to handle a new threat.",
    whyWeRecommend: "The most visually beautiful animated feature ever created. Every frame utilizes different artistic media, delivering a breathtaking and emotional comic-book masterpiece on screen.",
    genre: "Animation / Action",
    duration: "2h 20m",
    released: "2023",
    whereToFind: "Netflix, Prime Video",
    seedKeyword: "spiderverse_neon_cyberpunk",
    tags: ["animation", "superhero", "visual_masterpiece", "multiverse"]
  }
];

export async function POST(req: NextRequest) {
  try {
    const { query, type = "all" } = await req.json();

    const normalizedType = type.toLowerCase();
    
    // If query is empty, we can quickly return a filtered list of our curated items
    if (!query || query.trim() === "") {
      let filtered = FALLBACK_RECOMMENDATIONS;
      if (normalizedType !== "all") {
        filtered = FALLBACK_RECOMMENDATIONS.filter(item => item.type === normalizedType);
      }
      return NextResponse.json({ recommendations: filtered, source: "curated" });
    }

    const ai = getGeminiClient();

    // If Gemini client cannot be initialized (no API Key), fallback gracefully
    if (!ai) {
      console.warn("GEMINI_API_KEY is not defined. Falling back to semantic search simulation on curated items.");
      const cleanedQuery = query.toLowerCase();
      const filtered = FALLBACK_RECOMMENDATIONS.filter(item => {
        const matchesType = normalizedType === "all" || item.type === normalizedType;
        const matchesQuery = 
          item.title.toLowerCase().includes(cleanedQuery) || 
          item.creator.toLowerCase().includes(cleanedQuery) || 
          item.description.toLowerCase().includes(cleanedQuery) || 
          item.genre.toLowerCase().includes(cleanedQuery) ||
          item.tags.some(t => t.toLowerCase().includes(cleanedQuery));
        return matchesType && matchesQuery;
      });

      // If no exact match, return general fallback of type
      const finalItems = filtered.length > 0 ? filtered : FALLBACK_RECOMMENDATIONS.filter(item => normalizedType === "all" || item.type === normalizedType);
      return NextResponse.json({ recommendations: finalItems, source: "curated_search" });
    }

    // Call Gemini to generate high-fidelity recommendations matching the user's specific query
    const targetMedia = normalizedType === "all" ? "movies and podcasts" : normalizedType === "movie" ? "movies" : "podcasts";

    const prompt = `You are a legendary editor-in-chief of The Zerge, known for high-authority, incredibly sharp and stylish media reviews.
Provide a list of up to 5 exceptional, real ${targetMedia} that perfectly match or answer the user's inquiry: "${query}".
For each entry, ensure you generate compelling editorial metadata. Write real names of actual, popular, critically acclaimed movies or podcasts.
Do NOT make up fake titles. Provide detailed, engaging reviews written in the signature cynical yet passionate tech-enthusiast style of The Zerge.

Provide your response in JSON format matching the requested schema.`;

    const responseSchema = {
      type: Type.ARRAY,
      description: "A list of relevant, high-quality, real movie or podcast recommendations matching the user's search.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The official real title of the movie or podcast" },
          creator: { type: Type.STRING, description: "The lead director for movies, or hosts/publishers for podcasts" },
          type: { type: Type.STRING, description: "Must be exactly 'movie' or 'podcast'" },
          rating: { type: Type.NUMBER, description: "A realistic fan score rating from 1.0 to 10.0 based on general acclaim (e.g. 8.9)" },
          vergeScore: { type: Type.NUMBER, description: "The prestigious, elite Zerge Score circle rating from 1.0 to 10.0 (e.g. 9.1)" },
          description: { type: Type.STRING, description: "A highly engaging 2-sentence headline editorial summary of the plot or format" },
          whyWeRecommend: { type: Type.STRING, description: "A punchy explanation (2-3 sentences) detailing its relevance and artistic or technical brilliance" },
          genre: { type: Type.STRING, description: "Niche tag specifying the primary genre (e.g., 'Brutalist Sci-Fi', 'Tech investigative journalism', 'Cyberpunk Action')" },
          duration: { type: Type.STRING, description: "Typical episode runtime or film length, e.g., '2h 14m' or '45m average'" },
          released: { type: Type.STRING, description: "The release year, e.g. '2025' or '2024'" },
          whereToFind: { type: Type.STRING, description: "Primary streaming or audio distributions, e.g., 'Netflix', 'Spotify', 'Apple Podcasts', 'Max'" },
          seedKeyword: { type: Type.STRING, description: "A single, highly visual theme keyword used as an aesthetic reference, e.g., 'cyberpunk', 'retro_future', 'podcast_studio', 'space_cosmos', 'dystopian_neon'" },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-4 lowercase keyword tags, e.g., ['tech', 'mystery', 'soundtrack', 'dark']"
          }
        },
        required: [
          "title",
          "creator",
          "type",
          "rating",
          "vergeScore",
          "description",
          "whyWeRecommend",
          "genre",
          "duration",
          "released",
          "whereToFind",
          "seedKeyword",
          "tags"
        ]
      }
    };

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite critique editor for The Zerge. You write elegant, direct, authentic, and stylized movie and podcast recommendations. You return only beautifully structured JSON adhering strictly to the schema.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const text = aiRes.text;
    if (!text) {
      throw new Error("Received empty content response from Gemini");
    }

    const recommendations = JSON.parse(text.trim());
    return NextResponse.json({ recommendations, source: "gemini" });

  } catch (err: any) {
    console.error("Error generating recommendations via Gemini API:", err);
    // Return graceful fallback on any server error
    return NextResponse.json({
      recommendations: FALLBACK_RECOMMENDATIONS.slice(0, 5),
      source: "error_fallback",
      error: err.message
    });
  }
}
