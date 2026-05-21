/**
 * BENCHLIFE V2 - COMPLETE CONTENT LIBRARY
 * 
 * Contains:
 * - Bench types (Lovers, Friends, Sillies)
 * - Discovery questions for each type
 * - Prompt library for each type
 * - All science-backed and playfully balanced
 * 
 * Usage: Include this file before index.html main logic
 * Then reference: BENCH_TYPES, DISCOVERY_QUESTIONS, BENCH_PROMPTS
 */

// ══════════════════════════════════════════════════════════════════════════════
// BENCH TYPES CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

const BENCH_TYPES = {
  lovers: {
    id: "lovers",
    emoji: "♡",
    name: "Lovers",
    tagline: "for two people, exactly.",
    description: "Tender, playful, a little spicy. The bench knows you. Every location becomes intimate.",
    palette: {
      accent: "#c4909a",
      bg: "#f5eaf0",
      dot: "#d4a0aa",
      muted: "#a07080",
      light: "#fdf6f8"
    },
    games: ["Truth", "Dare", "Story", "After Dark"],
    features: ["sensual_prompts", "voice_memos", "adore_button"]
  },
  friends: {
    id: "friends",
    emoji: "✦",
    name: "Friends",
    tagline: "the 3am kitchen conversation.",
    description: "Catch up properly. Say what you've been meaning to say. The location doesn't matter — you do.",
    palette: {
      accent: "#c4956a",
      bg: "#f2ede3",
      dot: "#d4a57a",
      muted: "#907050",
      light: "#faf6ef"
    },
    games: ["Catch Up", "Deep Cut", "Dare", "Goofy"],
    features: ["memory_sharing", "voice_memos", "inside_jokes"]
  },
  sillies: {
    id: "sillies",
    emoji: "✸",
    name: "Sillies",
    tagline: "zero chill. maximum chaos.",
    description: "Absolute nonsense. Any location is an excuse to be ridiculous together.",
    palette: {
      accent: "#7ab558",
      bg: "#edf2e8",
      dot: "#8ac568",
      muted: "#507030",
      light: "#f5faf2"
    },
    games: ["Roast", "Chaos Dare", "Hot Take", "Worst Of"],
    features: ["roast_points", "chaos_scoring", "screenshots"]
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// DISCOVERY QUESTIONS - ALL TYPES
// ══════════════════════════════════════════════════════════════════════════════

const DISCOVERY_QUESTIONS = {
  lovers: [
    { id: "l01", q: "How do you typically express affection?", opts: ["Physical touch (hands, hugs, closeness)", "Words of affirmation and compliments", "Quality time and undivided attention", "Acts of service or helping them", "A mix of everything"] },
    { id: "l02", q: "What makes you feel most seen by them?", opts: ["When they notice small things about me", "When they listen without trying to fix", "When they're physically close or touch me", "When they initiate time together", "When they remember things I've said"] },
    { id: "l03", q: "What's your favorite inside joke or silly thing between you?", opts: ["A dumb thing one of us said that stuck", "An inside reference only we understand", "A nickname or running gag", "Something embarrassing from early on", "We don't really have one yet"] },
    { id: "l04", q: "How comfortable are you with vulnerability?", opts: ["I share everything immediately", "I share when I feel safe enough", "I hold back initially but open up", "I struggle with emotional vulnerability", "Physical vulnerability is easier for me"] },
    { id: "l05", q: "What does physical intimacy mean to you?", opts: ["It's how I show and feel love", "It's important but not everything", "It's connected to emotional closeness", "I prefer to take it slow", "It's spontaneous and playful"] },
    { id: "l06", q: "What's the silliest thing you've caught yourself doing because of them?", opts: ["Accidentally copying their laugh or expressions", "Doing something completely unlike me", "Getting distracted mid-sentence thinking about them", "Acting like a completely different person", "Nothing — I'm always me"] },
    { id: "l07", q: "What's something you want to explore together?", opts: ["Being more vulnerable emotionally", "More playfulness and silliness", "More physical closeness", "Deeper conversations about desires", "More novelty and trying new things"] },
    { id: "l08", q: "How do you react when they express desire for you?", opts: ["I feel desired and confident", "I'm flattered but sometimes shy", "I want to reciprocate immediately", "I need a moment to respond", "It makes me want to do the same"] },
    { id: "l09", q: "What creates the most connection for you?", opts: ["Eye contact and full attention", "Shared laughter and inside jokes", "Physical proximity and touch", "Honest conversation about real things", "Doing something new or silly together"] },
    { id: "l10", q: "What's something you've wanted to tell them but haven't?", opts: ["How much they mean to me", "What I find attractive about them", "Something I want to try", "A fear or insecurity", "How they make me feel physically"] }
  ],
  
  friends: [
    { id: "f01", q: "How long have you known each other?", opts: ["Less than a year", "1-3 years", "3-5 years", "5+ years", "Since forever"] },
    { id: "f02", q: "What do you text each other about most?", opts: ["Random memes and funny things", "Real stuff going on in our lives", "A mix of everything", "Inside jokes only we understand", "Whatever's on our minds"] },
    { id: "f03", q: "What makes you feel most supported by them?", opts: ["When they listen without judgment", "When they make me laugh during hard times", "When they actually remember details", "When they show up without being asked", "When they're honest with me"] },
    { id: "f04", q: "What's your favorite inside joke?", opts: ["Something dumb one of us said", "An old memory we keep referencing", "A running gag about them", "A reference only we get", "We don't really have one"] },
    { id: "f05", q: "When's the last time you really caught up?", opts: ["Today or yesterday", "This week", "This month", "It's been a while", "We talk all the time"] },
    { id: "f06", q: "What do you miss most about them right now?", opts: ["Just being in the same room", "Making each other laugh", "Being able to tell them things", "Their perspective on stuff", "Nothing — we're always connected"] },
    { id: "f07", q: "What have you wanted to tell them but haven't?", opts: ["How much they actually mean to me", "That I'm going through something", "That I've been thinking of them", "Something I'm proud of them for", "Nothing — we tell each other everything"] },
    { id: "f08", q: "What's the biggest thing they've helped you through?", opts: ["A hard time in my life", "A decision I had to make", "Just being there when I needed it", "Making me feel less alone", "Being honest when I needed it"] },
    { id: "f09", q: "How do you usually spend time together?", opts: ["Talking and catching up", "Doing activities we both enjoy", "Just goofing around", "Adventures and trying new things", "A mix of everything"] },
    { id: "f10", q: "What would you want them to know right now?", opts: ["That I value our friendship deeply", "That I've been thinking about them", "Something about what's going on with me", "That they inspire me", "That I appreciate them in specific ways"] }
  ],
  
  sillies: [
    { id: "s01", q: "What's your chaos energy level together?", opts: ["Maximum — we're a disaster", "Pretty high — trouble follows us", "Moderate — we have our moments", "We're fairly responsible", "Depends on the day"] },
    { id: "s02", q: "What do you text each other?", opts: ["Memes. Endless memes.", "Dumb jokes and one-liners", "Screenshots of chaos", "Random thoughts at 2am", "All of the above"] },
    { id: "s03", q: "What's your go-to roast of them?", opts: ["Their appearance/fashion", "Their personality quirks", "Something they said once", "Their questionable decisions", "We don't really roast each other"] },
    { id: "s04", q: "What inside joke hits different?", opts: ["Something from early on", "Something completely random", "A running gag that evolved", "A shared embarrassing moment", "We have too many to pick"] },
    { id: "s05", q: "Most ridiculous thing you've done together?", opts: ["Something nobody would approve of", "A harmless adventure", "A spur-of-the-moment decision", "An in-public disaster", "Too many to count"] },
    { id: "s06", q: "How do you make each other laugh?", opts: ["Dark humor / edgy jokes", "Physical comedy / being dumb", "Weird observations", "Roasting and banter", "All of the above"] },
    { id: "s07", q: "What would they dare you to do?", opts: ["Something completely ridiculous", "Something slightly embarrassing", "Something against your comfort zone", "Something harmless but funny", "Knowing them, something unhinged"] },
    { id: "s08", q: "How do you vibe together?", opts: ["We're the same kind of insane", "They bring out my weird side", "I'm the responsible one", "They keep me grounded (barely)", "It's chaotic but it works"] },
    { id: "s09", q: "What's the worst take they have?", opts: ["A genuinely terrible opinion", "Something petty they're wrong about", "A wild conspiracy theory", "Something objectively bad taste", "Too many to choose"] },
    { id: "s10", q: "What do you love about them?", opts: ["They don't take anything seriously", "They're down for whatever", "They get my sense of humor", "They're genuinely a good person", "All of the above"] }
  ]
};

// ══════════════════════════════════════════════════════════════════════════════
// BENCH PROMPTS - ALL TYPES
// ══════════════════════════════════════════════════════════════════════════════

const BENCH_PROMPTS = {
  lovers: {
    vulnerability: [
      { type: "truth", depth: 1, prompt: "What's something small I might not notice about you that you're self-conscious about?", done: "That took courage." },
      { type: "truth", depth: 2, prompt: "Tell me about a moment when you felt completely safe with me. What was it?", done: "I feel that too." },
      { type: "truth", depth: 2, prompt: "What's a fear you have that I don't know about? Not about us — about you.", done: "Thank you for trusting me." },
      { type: "truth", depth: 3, prompt: "What's something you want from me that you're afraid to ask for?", done: "I'm listening." },
      { type: "truth", depth: 2, prompt: "When do you feel most insecure with me? What would help?", done: "I've got you." }
    ],
    desire: [
      { type: "dare", depth: 1, prompt: "Tell me one thing you find attractive about me that you don't say enough.", done: "I'm blushing." },
      { type: "truth", depth: 1, prompt: "Right now — what are you noticing about me physically?", done: "I see you." },
      { type: "dare", depth: 2, prompt: "Describe in detail what you find most attractive about me. Take your time.", done: "Playing that back." },
      { type: "truth", depth: 2, prompt: "What was the moment you first felt genuine physical desire for me?", done: "I remember." },
      { type: "dare", depth: 2, prompt: "Send me a voice memo. Say my name the way you say it when it's just us.", done: "I heard that." },
      { type: "truth", depth: 3, prompt: "What do you want from me that you haven't asked for? Specifically.", done: "I want that too." }
    ],
    presence: [
      { type: "dare", depth: 1, prompt: "Look at me. Just for 30 seconds. No talking. Notice what you see.", done: "I saw you." },
      { type: "truth", depth: 1, prompt: "When you look at me, what do you see that makes you stay?", done: "Because of you." },
      { type: "dare", depth: 2, prompt: "Hold my gaze while you tell me something true about how you feel right now.", done: "I felt that shift." },
      { type: "truth", depth: 1, prompt: "What does my face look like when I'm thinking about you?", done: "Exactly like that." }
    ],
    touch: [
      { type: "dare", depth: 1, prompt: "Take my hand and don't let go while we talk for the next few minutes.", done: "I'm not letting go." },
      { type: "dare", depth: 1, prompt: "Touch the part of my body you find most attractive. No explanation needed.", done: "I felt that." },
      { type: "truth", depth: 2, prompt: "Where do you like to be touched by me? Show me or tell me.", done: "Noted." },
      { type: "dare", depth: 2, prompt: "Slow touch. Draw a line down my arm. Tell me what you're feeling.", done: "I'm still feeling that." },
      { type: "truth", depth: 1, prompt: "When was the last time you wanted to touch me but held back? Why?", done: "No more holding back." }
    ],
    novelty: [
      { type: "dare", depth: 1, prompt: "Tell me something you've never told anyone about what attracts you to me.", done: "Nobody else knows that." },
      { type: "dare", depth: 2, prompt: "Describe what you'd do if you had no inhibitions. Just us. Specifics.", done: "Save that for later." },
      { type: "truth", depth: 2, prompt: "What's something we haven't tried that you're curious about?", done: "Let's explore that." },
      { type: "dare", depth: 1, prompt: "Try something you've never done with me — even if it's small. Right now.", done: "That was new." }
    ],
    affirmation: [
      { type: "dare", depth: 1, prompt: "Tell me three specific things you appreciate about me that nobody else sees.", done: "Only you notice those." },
      { type: "truth", depth: 1, prompt: "What's a moment recently when I did something that made you feel loved?", done: "I meant it." },
      { type: "dare", depth: 1, prompt: "Send me a voice memo listing things you find beautiful about me. Just listen to yourself say it.", done: "Saving this forever." },
      { type: "truth", depth: 2, prompt: "When did you realize I was someone worth building something with?", done: "You were always the one." }
    ],
    mutual: [
      { type: "dare", depth: 2, prompt: "We both name one insecurity. Then we say what we see instead.", done: "I see you completely." },
      { type: "truth", depth: 2, prompt: "What's something I do that makes you feel safe enough to let your guard down?", done: "Keep doing that." },
      { type: "dare", depth: 3, prompt: "Tell me something you want but you're afraid to. I'll match your vulnerability.", done: "We want the same things." }
    ],
    laughter: [
      { type: "dare", depth: 0, prompt: "Make me laugh right now. Your way.", done: "That laugh is mine." },
      { type: "truth", depth: 0, prompt: "What's the silliest thing about me that you secretly love?", done: "It's my favorite." },
      { type: "dare", depth: 0, prompt: "Do your worst impression of me right now. Go all out.", done: "Ouch. But accurate." },
      { type: "truth", depth: 1, prompt: "What inside joke between us never gets old?", done: "Still funny." },
      { type: "dare", depth: 0, prompt: "Send me a selfie doing the most ridiculous face you can make.", done: "Perfection." },
      { type: "truth", depth: 0, prompt: "What's something I do that's completely unintentionally funny?", done: "You're adorable." },
      { type: "dare", depth: 1, prompt: "Tell me the funniest thing you've ever thought about me but never said.", done: "Why didn't you tell me?" },
      { type: "dare", depth: 0, prompt: "What would our 'couple theme song' be if it was completely ridiculous?", done: "I love that for us." },
      { type: "truth", depth: 0, prompt: "What's the worst caption you could write for a photo of us?", done: "Stop it. I'm crying." },
      { type: "dare", depth: 1, prompt: "Do something completely silly right now — dance, sing, whatever. Let me see.", done: "You're so unselfconscious. I love that." },
      { type: "truth", depth: 1, prompt: "What's the most ridiculous argument we've ever had that we can laugh about now?", done: "We were so weird." },
      { type: "dare", depth: 0, prompt: "Give me a ridiculous compliment. Make it absurd.", done: "I'll take it." }
    ],
    banter: [
      { type: "dare", depth: 0, prompt: "What's your go-to roast of me? The one you say with love.", done: "Deserved." },
      { type: "truth", depth: 0, prompt: "What's something I'm delusional about?", done: "We're all a little delusional." },
      { type: "dare", depth: 0, prompt: "Tell me what I'm thinking right now. Make a wild guess.", done: "So close. So far." },
      { type: "truth", depth: 1, prompt: "What's the funniest misunderstanding we've had?", done: "I can't believe you thought that." },
      { type: "dare", depth: 0, prompt: "What would you say if I asked you what your biggest pet peeve about me is, but make it funny?", done: "Brutal and hilarious." }
    ],
    goofiness: [
      { type: "dare", depth: 0, prompt: "We're going to have a staring contest right now. First to laugh loses.", done: "You cracked first." },
      { type: "dare", depth: 0, prompt: "Describe me using only animal comparisons. Go.", done: "I'm not sure how I feel about that." },
      { type: "dare", depth: 0, prompt: "What's something you'd tell people about me that sounds like a made-up superpower?", done: "I do have that power." },
      { type: "truth", depth: 0, prompt: "If our relationship was a reality TV show, what would it be called?", done: "That's too accurate." },
      { type: "dare", depth: 0, prompt: "Send me a voice memo of you doing the worst possible impression of how I walk/talk/laugh.", done: "I don't walk like that!" },
      { type: "truth", depth: 0, prompt: "What celebrity couple do you think we're most like?", done: "I can see it." },
      { type: "dare", depth: 0, prompt: "What's the worst advice you could give me about my own personality?", done: "That's terrible. I'm keeping it." }
    ],
    surprises: [
      { type: "dare", depth: 0, prompt: "What's something completely random you'd want to do with me right now?", done: "Let's do that soon." },
      { type: "dare", depth: 1, prompt: "Plan something ridiculous we could do together that neither of us would normally do.", done: "This needs to happen." },
      { type: "truth", depth: 0, prompt: "What's something I did that totally surprised you (in a good way)?", done: "You surprised me too." },
      { type: "dare", depth: 0, prompt: "Let's swap one small habit or quirk about ourselves for a day. What would you trade?", done: "That's hilarious." }
    ],
    heartThenLaugh: [
      { type: "dare", depth: 1, prompt: "Tell me something real, then immediately follow it with the silliest thing possible.", done: "That swing was perfect." },
      { type: "truth", depth: 1, prompt: "What's something you love about me? Then tell me what ridiculous superpower I have.", done: "Both are true." },
      { type: "dare", depth: 2, prompt: "Say something vulnerable, I'll respond seriously. Then we both laugh at how sappy we're being.", done: "That was perfect." }
    ]
  },

  friends: {
    connection: [
      { type: "truth", depth: 1, prompt: "When did you first realize this friendship was going to stick around?", done: "It's stuck for good." },
      { type: "truth", depth: 2, prompt: "What moment with them made you feel like they really saw you?", done: "That's a big one." },
      { type: "truth", depth: 1, prompt: "What do you think they bring out in you that nobody else does?", done: "That's special." },
      { type: "dare", depth: 1, prompt: "Tell them one specific way they've made your life better.", done: "I needed to hear that." }
    ],
    support: [
      { type: "truth", depth: 1, prompt: "What's something you're going through that you haven't told them about?", done: "You can tell them." },
      { type: "truth", depth: 2, prompt: "When was the last time you really needed them?", done: "I'm here now." },
      { type: "dare", depth: 1, prompt: "Ask them for something you actually need help with.", done: "That took courage." },
      { type: "truth", depth: 1, prompt: "What's something they've done for you that you've never fully thanked them for?", done: "Thank them anyway." }
    ],
    laughter: [
      { type: "dare", depth: 0, prompt: "What's the funniest memory you have together? Tell it.", done: "I'm dying." },
      { type: "truth", depth: 0, prompt: "What inside joke never gets old?", done: "Still funny." },
      { type: "dare", depth: 0, prompt: "Do your best impression of them right now.", done: "That's so accurate." },
      { type: "truth", depth: 0, prompt: "What's the silliest thing they do that cracks you up?", done: "It's the best." },
      { type: "dare", depth: 0, prompt: "Send them a meme or joke that made you think of them.", done: "Perfect." }
    ],
    memories: [
      { type: "truth", depth: 1, prompt: "What's your favorite memory with them?", done: "That was a good day." },
      { type: "truth", depth: 0, prompt: "Where were you the first time you met? Describe it.", done: "I remember that." },
      { type: "dare", depth: 1, prompt: "Tell them about a time they surprised you (in a good way).", done: "I didn't know that mattered to you." },
      { type: "truth", depth: 1, prompt: "What's a small moment with them you keep coming back to?", done: "That's the one." }
    ],
    honesty: [
      { type: "truth", depth: 2, prompt: "What's something you've wanted to be honest about?", done: "Thank you for that." },
      { type: "dare", depth: 1, prompt: "Tell them something real about how you're actually doing.", done: "I'm listening." },
      { type: "truth", depth: 1, prompt: "What would you want them to know that you've never said?", done: "I'm glad you said it." },
      { type: "dare", depth: 2, prompt: "Ask them for honest feedback about something you've been wondering.", done: "That took guts." }
    ],
    future: [
      { type: "truth", depth: 1, prompt: "What do you hope for us in the next year?", done: "Me too." },
      { type: "dare", depth: 0, prompt: "Plan something you want to do together soon.", done: "Let's make it happen." },
      { type: "truth", depth: 1, prompt: "What's something you want to do or experience together?", done: "I'm in." }
    ],
    appreciation: [
      { type: "dare", depth: 0, prompt: "List three things you genuinely appreciate about them.", done: "That means everything." },
      { type: "truth", depth: 1, prompt: "What's something about them that deserves more recognition?", done: "They should know that." },
      { type: "dare", depth: 1, prompt: "Send them a voice memo telling them why they matter to you.", done: "Saving this." },
      { type: "truth", depth: 0, prompt: "What's one thing they do that always makes your day better?", done: "I love that about them." }
    ]
  },

  sillies: {
    chaos: [
      { type: "truth", depth: 0, prompt: "What's the most ridiculous thing you've done together?", done: "Legend behavior." },
      { type: "dare", depth: 0, prompt: "What would you do right now if there were zero consequences?", done: "Save that energy." },
      { type: "truth", depth: 0, prompt: "What's the dumbest decision you've made together that actually worked out?", done: "How are you alive?" },
      { type: "dare", depth: 0, prompt: "Describe the worst idea one of you has ever had.", done: "That would've been a disaster." }
    ],
    roasting: [
      { type: "dare", depth: 0, prompt: "What's your go-to roast of them? Go all out.", done: "Ouch. Accurate." },
      { type: "truth", depth: 0, prompt: "What's the funniest personality flaw they have?", done: "It's iconic." },
      { type: "dare", depth: 0, prompt: "Describe their worst trait but make it funny.", done: "They're laughing." },
      { type: "truth", depth: 0, prompt: "What's something they're delusional about?", done: "So true." },
      { type: "dare", depth: 0, prompt: "What's their most embarrassing quality? (they'd laugh about it)", done: "They'd own it." }
    ],
    memes: [
      { type: "dare", depth: 0, prompt: "Send them a meme that's giving their energy.", done: "That's them exactly." },
      { type: "truth", depth: 0, prompt: "What meme format does your friendship fit into?", done: "Perfect description." },
      { type: "dare", depth: 0, prompt: "Create the worst possible caption for a photo of you two.", done: "Delete this." },
      { type: "truth", depth: 0, prompt: "What's your 2am text energy?", done: "Unhinged and perfect." }
    ],
    absurd: [
      { type: "dare", depth: 0, prompt: "What would your couple superhero name be?", done: "I'm in that universe." },
      { type: "truth", depth: 0, prompt: "If you were a chaotic couple in a movie, what would it be?", done: "That's your biopic." },
      { type: "dare", depth: 0, prompt: "What's something you'd want on your shared tombstone?", done: "Iconic." },
      { type: "truth", depth: 0, prompt: "If you had a reality show together, what would the first episode be?", done: "Emmy worthy." },
      { type: "dare", depth: 0, prompt: "Design the worst matching outfit you'd both wear anyway.", done: "DO IT." }
    ],
    hotTakes: [
      { type: "truth", depth: 0, prompt: "What's the worst take they have that you've never corrected them on?", done: "Let them live in delusion." },
      { type: "dare", depth: 0, prompt: "What's an objectively wrong opinion they have? (love them anyway)", done: "So confidently wrong." },
      { type: "truth", depth: 0, prompt: "What hill would they die on that's completely ridiculous?", done: "Let them." }
    ],
    laughs: [
      { type: "dare", depth: 0, prompt: "Make them laugh right now using only terrible jokes.", done: "Peak comedy." },
      { type: "truth", depth: 0, prompt: "What inside joke never gets old?", done: "Still works." },
      { type: "dare", depth: 0, prompt: "Do the worst possible impression of them.", done: "Spot on." },
      { type: "truth", depth: 0, prompt: "What's the dumbest thing that always cracks you both up?", done: "Simple things." }
    ],
    randomChaos: [
      { type: "dare", depth: 0, prompt: "Rate your friendship on a chaos scale (1-10). Explain.", done: "That tracks." },
      { type: "truth", depth: 0, prompt: "What would be the worst time to get the giggles together?", done: "That's happened." },
      { type: "dare", depth: 0, prompt: "What's a stupid argument you've had that was actually hilarious?", done: "Worth the drama." },
      { type: "truth", depth: 0, prompt: "If you were banned from every public place, what would it be for?", done: "That checks out." }
    ]
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// SHARED LOCATIONS (All types can access)
// ══════════════════════════════════════════════════════════════════════════════

const ALL_LOCATIONS = [
  "rooftop", "vineyard", "night pier", "garden",
  "café", "park", "sidewalk", "harbor",
  "carnival", "space cupola", "floating island", "underground cave",
  "meadow", "porch", "lake", "autumn ravine",
  "greenhouse", "ancient library", "treehouse", "submarine"
];

// Export for use in existing codebase
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BENCH_TYPES, DISCOVERY_QUESTIONS, BENCH_PROMPTS, ALL_LOCATIONS };
}
