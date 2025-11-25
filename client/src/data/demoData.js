// Demo data for showcase/demo page
// This is completely static and separate from actual user data

export const demoUser = {
  firstName: "Alex",
  lastName: "Storyteller",
  email: "demo@personatales.com",
  image: null, // Will use dicebear initials
  accountType: "User",
  createdAt: "2024-10-15T10:30:00.000Z",
};

export const demoStories = [
  {
    _id: "demo-story-1",
    userId: "demo-user",
    title: "The Last Dragon Keeper",
    genre: "Fantasy",
    prompt: "A young girl discovers she's the last person who can communicate with dragons",
    storyText: `Elara heard a voice in her head when the dragon landed. Nobody else could hear it. The dragon said she was special - a Dragon Speaker. Her grandmother was one too, but she died last year. The village was scared of dragons. They wanted them to leave. But Elara learned dragons help protect the forests and keep nature balanced. When loggers came to cut down the old trees, Elara spoke up. She told everyone what the dragons really do. The village decided to protect the forest. The dragons stayed. Elara promised to teach others about dragons so they would never be misunderstood again.`,
    audioFileUrl: "/demo-audio/story1.mp3",
    audioLanguage: "en",
    createdAt: "2024-11-20T14:30:00.000Z",
    updatedAt: "2024-11-20T14:30:00.000Z",
  },
  {
    _id: "demo-story-2",
    userId: "demo-user",
    title: "The Midnight Library Mystery",
    genre: "Mystery",
    prompt: "A librarian finds books that predict the future, but reading them changes the timeline",
    storyText: `Margaret found strange books in the library basement. One book showed tomorrow's news. A fire would happen at 3:47 PM. The next day, the fire really happened. She tested it again with an election prediction. But when she told people, the election results changed. She realized reading the books changed the future. Then she found a book about her own car accident next week. She was scared. Instead of staying home, she got the city to add a traffic light at the dangerous spot. It worked. She survived. Now Margaret only reads the books to stop bad things from happening. She has to be very careful.`,
    audioFileUrl: "/demo-audio/story2.mp3",
    audioLanguage: "en",
    createdAt: "2024-11-22T09:15:00.000Z",
    updatedAt: "2024-11-22T09:15:00.000Z",
  },
  {
    _id: "demo-story-3",
    userId: "demo-user",
    title: "The Echo Station",
    genre: "Science Fiction",
    prompt: "On a space station, an astronaut receives messages from themselves 24 hours in the future",
    storyText: `Elena got a weird message from herself. It was dated tomorrow. It said don't go to Section D at 2 PM. She thought it was a computer bug. But the next day, Section D had a coolant leak at exactly 2 PM. She would have died there. She sent the same message back to yesterday. The message was from her future self. For weeks, future Elena sent warnings. Fix the reactor. Check the supplies. Every warning helped. Then she found the broken equipment causing it. She could fix it and stop the messages. But the messages saved lives. She decided to leave it broken. Some glitches are helpful.`,
    audioFileUrl: "/demo-audio/story3.mp3",
    audioLanguage: "en",
    createdAt: "2024-11-24T16:45:00.000Z",
    updatedAt: "2024-11-24T16:45:00.000Z",
  },
];

// Badge data matching the Certificates component structure
export const demoBadges = [
  {
    id: 1,
    title: "Story Beginner",
    description: "For creating your first story.",
    minStories: 1,
    emoji: "🌟",
  },
  {
    id: 2,
    title: "Story Enthusiast",
    description: "For creating 3 or more stories.",
    minStories: 3,
    emoji: "✨",
  },
];

// Stats for the demo user
export const demoStats = {
  totalStories: 3,
  favoriteGenre: "Fantasy",
  totalWords: 345, // Approximate total word count
  memberSince: "October 2024",
};

