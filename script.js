// QUOTATION DATABASE (rich collection)
const quotesLibrary = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", tag: "passion" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", tag: "life" },
    { text: "Get busy living or get busy dying.", author: "Stephen King", tag: "motivation" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy", tag: "strength" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", tag: "belief" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", tag: "dreams" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", tag: "persistence" },
    { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius", tag: "resilience" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", tag: "courage" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", tag: "happiness" },
    { text: "The mind is everything. What you think you become.", author: "Buddha", tag: "mindfulness" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", tag: "opportunity" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar", tag: "growth" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", tag: "fear" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", tag: "action" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan", tag: "ambition" },
    { text: "The art of being wise is the art of knowing what to overlook.", author: "William James", tag: "wisdom" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", tag: "opportunity" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi", tag: "resilience" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", tag: "motivation" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman", tag: "optimism" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", tag: "beginnings" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", tag: "authenticity" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali", tag: "purpose" },
    { text: "If you are working on something that you really care about, you don't have to be pushed.", author: "Steve Jobs", tag: "passion" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", tag: "inner strength" },
    { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt", tag: "renewal" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James", tag: "impact" },
    { text: "We generate fears while we sit. We overcome them by action.", author: "Dr. Henry Link", tag: "fear" },
    { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem", tag: "dreams" },
    { text: "Let us make our future now, and let us make our dreams tomorrow's reality.", author: "Malala Yousafzai", tag: "future" },
    { text: "Courage is grace under pressure.", author: "Ernest Hemingway", tag: "courage" },
    { text: "Everything has beauty, but not everyone sees it.", author: "Confucius", tag: "beauty" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", tag: "simplicity" }
];

let currentQuoteObj = null;
let toastTimeout = null;
let isLoading = false;

// Helper: get random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotesLibrary.length);
    return { ...quotesLibrary[randomIndex] };
}

// Display quote in DOM
function displayQuote(quote) {
    if (!quote) return;
    const quoteTextEl = document.getElementById('quoteText');
    const authorNameEl = document.getElementById('authorName');
    const tagEl = document.getElementById('quoteTag');
    
    quoteTextEl.style.opacity = '0';
    setTimeout(() => {
        quoteTextEl.innerText = quote.text;
        authorNameEl.innerText = quote.author;
        let tagDisplay = quote.tag ? quote.tag.replace(/\s+/g, '') : 'insight';
        tagEl.innerText = `#${tagDisplay.toLowerCase()}`;
        quoteTextEl.style.opacity = '1';
    }, 80);
    
    authorNameEl.innerText = quote.author;
    if (quote.tag) tagEl.innerText = `#${quote.tag.toLowerCase()}`;
    else tagEl.innerText = `#wisdom`;
    quoteTextEl.innerText = quote.text;
    quoteTextEl.style.opacity = '1';
}

// Set new random quote
function setNewRandomQuote() {
    const newQuote = getRandomQuote();
    currentQuoteObj = newQuote;
    displayQuote(currentQuoteObj);
    return currentQuoteObj;
}

// Copy quote to clipboard
async function copyCurrentQuote() {
    if (!currentQuoteObj) {
        currentQuoteObj = getRandomQuote();
        displayQuote(currentQuoteObj);
    }
    const formatted = `“${currentQuoteObj.text}” — ${currentQuoteObj.author}`;
    try {
        await navigator.clipboard.writeText(formatted);
        showToastMessage("📋 Quote copied!");
    } catch (err) {
        console.warn("Clipboard error", err);
        const textarea = document.createElement('textarea');
        textarea.value = formatted;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToastMessage("Copied (fallback)");
    }
}

// Share quote
async function shareCurrentQuote() {
    if (!currentQuoteObj) {
        currentQuoteObj = getRandomQuote();
        displayQuote(currentQuoteObj);
    }
    const shareText = `“${currentQuoteObj.text}” — ${currentQuoteObj.author}`;
    const shareTitle = "✨ Quotient – Daily Inspiration";
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                url: window.location.href,
            });
            showToastMessage("Shared successfully!");
        } catch (err) {
            if (err.name !== 'AbortError') {
                showToastMessage("Sharing cancelled or failed");
            }
        }
    } else {
        await navigator.clipboard.writeText(`${shareText} | via Quotient`);
        showToastMessage("🔗 Quote copied, you can share it now!");
    }
}

// Toast notification
function showToastMessage(message, duration = 2000) {
    const toast = document.getElementById('toastMsg');
    if (toastTimeout) clearTimeout(toastTimeout);
    toast.textContent = message || "✓ Done";
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Handle new quote with loader animation
async function handleNewQuoteWithLoader() {
    if (isLoading) return;
    const btn = document.getElementById('newQuoteBtn');
    isLoading = true;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<span class="loader"></span> Loading...';
    btn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 180));
    setNewRandomQuote();
    
    btn.innerHTML = originalContent;
    btn.disabled = false;
    isLoading = false;
    const quoteCard = document.querySelector('.quote-card');
    quoteCard.style.transform = 'scale(0.99)';
    setTimeout(() => { quoteCard.style.transform = ''; }, 120);
}

// Keyboard shortcuts
function handleKeyPress(e) {
    const key = e.key.toLowerCase();
    if (key === 'n') {
        e.preventDefault();
        handleNewQuoteWithLoader();
    } else if (key === 'c') {
        e.preventDefault();
        copyCurrentQuote();
    } else if (key === 's') {
        e.preventDefault();
        shareCurrentQuote();
    }
}

// Tag click - get quote from same category
function setupTagClickListener() {
    const tagElement = document.getElementById('quoteTag');
    if (tagElement) {
        tagElement.addEventListener('click', () => {
            if (!currentQuoteObj) return;
            const currentTag = currentQuoteObj.tag;
            if (!currentTag) {
                handleNewQuoteWithLoader();
                return;
            }
            const sameTagQuotes = quotesLibrary.filter(q => q.tag && q.tag.toLowerCase() === currentTag.toLowerCase());
            if (sameTagQuotes.length > 1) {
                let newQuote = sameTagQuotes[0];
                if (sameTagQuotes.length === 1 && sameTagQuotes[0].text === currentQuoteObj.text) {
                    newQuote = getRandomQuote();
                } else {
                    let filtered = sameTagQuotes.filter(q => q.text !== currentQuoteObj.text);
                    if (filtered.length === 0) filtered = sameTagQuotes;
                    const rand = Math.floor(Math.random() * filtered.length);
                    newQuote = { ...filtered[rand] };
                }
                currentQuoteObj = newQuote;
                displayQuote(currentQuoteObj);
                showToastMessage(`✨ #${currentTag.toLowerCase()} inspiration`, 1500);
            } else {
                handleNewQuoteWithLoader();
                showToastMessage(`🌀 new vibe`, 1000);
            }
        });
    }
}

// Easter egg: triple click on title
function setupEasterEgg() {
    const brandDiv = document.querySelector('.brand h1');
    if (brandDiv) {
        let clickCount = 0;
        brandDiv.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 3) {
                document.querySelector('.quote-container').style.boxShadow = '0 30px 50px -15px rgba(200, 120, 60, 0.4)';
                showToastMessage("✨ golden glow activated", 1000);
                setTimeout(() => {
                    document.querySelector('.quote-container').style.boxShadow = '';
                }, 800);
                clickCount = 0;
            }
            setTimeout(() => { clickCount = 0; }, 1500);
        });
    }
}

// Initialize the app
function init() {
    const startQuote = getRandomQuote();
    currentQuoteObj = startQuote;
    displayQuote(currentQuoteObj);
    
    const newBtn = document.getElementById('newQuoteBtn');
    const copyBtn = document.getElementById('copyQuoteBtn');
    const shareBtn = document.getElementById('shareQuoteBtn');
    
    newBtn.addEventListener('click', handleNewQuoteWithLoader);
    copyBtn.addEventListener('click', () => copyCurrentQuote());
    shareBtn.addEventListener('click', () => shareCurrentQuote());
    
    window.addEventListener('keydown', handleKeyPress);
    
    setupTagClickListener();
    setupEasterEgg();
    
    console.log('Quotient ready — inspire your day');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}