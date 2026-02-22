/**
 * Atlas Chatbot - Cal Strong Athletics Helper Bear
 * Interactive chatbot with pre-programmed Q&A knowledge base
 */

class AtlasChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('Atlas: Setting up chatbot...');
        
        // Get elements
        this.toggleBtn = document.getElementById('atlas-toggle');
        this.chatContainer = document.getElementById('atlas-chat');
        this.messagesContainer = this.chatContainer?.querySelector('.atlas-chat-messages');
        this.inputField = this.chatContainer?.querySelector('.atlas-chat-input input');
        this.sendBtn = this.chatContainer?.querySelector('.atlas-send-btn');
        this.closeBtn = this.chatContainer?.querySelector('.atlas-close-btn');

        console.log('Atlas: Toggle button found:', !!this.toggleBtn);
        console.log('Atlas: Chat container found:', !!this.chatContainer);

        if (!this.toggleBtn || !this.chatContainer) {
            console.error('Atlas chatbot elements not found!');
            return;
        }
        
        console.log('Atlas: Adding event listeners...');

        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn?.addEventListener('click', () => this.closeChat());
        this.sendBtn?.addEventListener('click', () => this.sendMessage());
        this.inputField?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Send welcome message after a short delay
        setTimeout(() => this.sendWelcomeMessage(), 500);
    }

    toggleChat() {
        console.log('Atlas: Toggle clicked! Currently open:', this.isOpen);
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        console.log('Atlas: Opening chat...');
        this.isOpen = true;
        this.chatContainer.classList.add('active');
        this.inputField?.focus();
        console.log('Atlas: Chat opened, active class added');
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.classList.remove('active');
    }

    sendWelcomeMessage() {
        const welcomeMessage = "Hi! I'm Atlas, Cal Strong's helper bear! 🐻 Ask me anything about our gymnastics programs, pricing, schedules, or how to get started!";
        this.addMessage(welcomeMessage, 'atlas');
        
        // Add quick reply options
        const quickReplies = [
            'What programs do you offer?',
            'How much does it cost?',
            'How do I enroll?'
        ];
        this.addQuickReplies(quickReplies);
    }

    sendMessage() {
        const message = this.inputField?.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.inputField.value = '';

        // Show typing indicator
        this.showTyping();

        // Get response
        setTimeout(() => {
            this.hideTyping();
            const response = this.getResponse(message);
            this.addMessage(response.text, 'atlas');
            
            if (response.quickReplies) {
                this.addQuickReplies(response.quickReplies);
            }
        }, 800 + Math.random() * 400); // Natural delay
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `atlas-message ${sender}`;

        if (sender === 'atlas') {
            messageDiv.innerHTML = `
                <img src="images/atlas/atlas-avatar.png" alt="Atlas" class="atlas-message-avatar">
                <div class="atlas-message-bubble">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="atlas-message-bubble">${text}</div>
            `;
        }

        this.messagesContainer?.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addQuickReplies(replies) {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'atlas-quick-replies';

        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'atlas-quick-reply-btn';
            btn.textContent = reply;
            btn.addEventListener('click', () => {
                this.inputField.value = reply;
                this.sendMessage();
                quickRepliesDiv.remove();
            });
            quickRepliesDiv.appendChild(btn);
        });

        this.messagesContainer?.appendChild(quickRepliesDiv);
        this.scrollToBottom();
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'atlas-typing';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        typingDiv.id = 'atlas-typing-indicator';
        this.messagesContainer?.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        document.getElementById('atlas-typing-indicator')?.remove();
    }

    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    getResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Knowledge Base - Cal Strong Athletics Programs & Info

        // Programs
        if (this.matchesKeywords(lowerMessage, ['program', 'class', 'offer', 'what do you'])) {
            return {
                text: `We offer 4 amazing programs! 🎯<br><br>
                    <strong>🐻 Kinder Gym</strong> (Ages 2.5-5.5)<br>
                    Fun fundamentals for little bears!<br><br>
                    <strong>💪 Boys Recreational</strong> (Ages 5.5-14)<br>
                    All 6 events, beginner to advanced<br><br>
                    <strong>⭐ Girls Recreational</strong> (Ages 5.5-14)<br>
                    All 4 events, all skill levels<br><br>
                    <strong>🤸 Tumbling</strong> (Ages 5.5-14)<br>
                    Pure tumbling & trampoline focus<br><br>
                    Want details on a specific program?`,
                quickReplies: ['Tell me about Kinder Gym', 'Boys Rec info', 'Girls Rec info', 'Tumbling info']
            };
        }

        // Kinder Gym
        if (this.matchesKeywords(lowerMessage, ['kinder', 'preschool', 'toddler', 'young', 'little'])) {
            return {
                text: `<strong>🐻 Kinder Gym Program</strong><br><br>
                    <strong>Ages:</strong> 2.5 - 5.5 years<br>
                    <strong>Price:</strong> $125/month<br>
                    <strong>Duration:</strong> 55-minute classes<br><br>
                    Perfect for little bears learning balance, coordination, and confidence! We make it fun with age-appropriate equipment and games. 🎉<br><br>
                    <a href="pages/kinder-gym-merged.html">Learn More</a> | <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">Enroll Now</a>`,
                quickReplies: ['How do I enroll?', 'What about older kids?']
            };
        }

        // Boys Rec
        if (this.matchesKeywords(lowerMessage, ['boys', 'son', 'male'])) {
            return {
                text: `<strong>💪 Boys Recreational Gymnastics</strong><br><br>
                    <strong>Ages:</strong> 5.5 - 14 years<br>
                    <strong>Pricing:</strong><br>
                    • Rec 1 & Rec 2: $145/month<br>
                    • Rec 3 (advanced): $170/month<br><br>
                    All 6 men's events: Floor, Pommel Horse, Rings, Vault, Parallel Bars, High Bar! Classes grouped by age and skill level. 🏆<br><br>
                    <a href="pages/boys-rec-merged.html">Learn More</a> | <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">Enroll Now</a>`,
                quickReplies: ['Class schedule?', 'How do I enroll?']
            };
        }

        // Girls Rec
        if (this.matchesKeywords(lowerMessage, ['girls', 'daughter', 'female'])) {
            return {
                text: `<strong>⭐ Girls Recreational Gymnastics</strong><br><br>
                    <strong>Ages:</strong> 5.5 - 14 years<br>
                    <strong>Pricing:</strong><br>
                    • Rec 1 & Rec 2: $145/month<br>
                    • Rec 3 (advanced): $170/month<br><br>
                    All 4 women's events: Vault, Bars, Beam, Floor! Progressive skill development in a supportive environment. ✨<br><br>
                    <a href="pages/girls-rec.html">Learn More</a> | <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">Enroll Now</a>`,
                quickReplies: ['Class schedule?', 'How do I enroll?']
            };
        }

        // Tumbling
        if (this.matchesKeywords(lowerMessage, ['tumbl', 'trampoline', 'flip'])) {
            return {
                text: `<strong>🤸 Tumbling Program</strong><br><br>
                    <strong>Ages:</strong> 5.5 - 14 years<br>
                    <strong>Pricing:</strong><br>
                    • Levels 1 & 2: $145/month<br>
                    • Level 3 (advanced): $170/month<br><br>
                    Focus on floor tumbling and trampoline skills! Perfect for cheerleaders, dancers, or anyone who loves to flip! 🌟<br><br>
                    <a href="pages/tumbling-merged.html">Learn More</a> | <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">Enroll Now</a>`,
                quickReplies: ['How do I enroll?', 'Other programs?']
            };
        }

        // Pricing
        if (this.matchesKeywords(lowerMessage, ['price', 'cost', 'how much', 'fee', 'tuition'])) {
            return {
                text: `<strong>💰 Pricing Breakdown</strong><br><br>
                    <strong>Kinder Gym:</strong> $125/month<br>
                    <strong>Rec 1 & Rec 2:</strong> $145/month<br>
                    <strong>Rec 3 (Advanced):</strong> $170/month<br>
                    <strong>Tumbling 1 & 2:</strong> $145/month<br>
                    <strong>Tumbling 3:</strong> $170/month<br><br>
                    💎 <strong>30-Day Money-Back Guarantee!</strong><br>
                    Try us risk-free - if you're not satisfied in the first 30 days, we'll refund 100%. No questions asked!`,
                quickReplies: ['Tell me about programs', 'How do I enroll?']
            };
        }

        // Enrollment / Sign Up
        if (this.matchesKeywords(lowerMessage, ['enroll', 'sign up', 'join', 'register', 'start'])) {
            return {
                text: `<strong>🎯 Ready to Get Started?</strong><br><br>
                    <strong>Step 1:</strong> Use our <a href="index-merged.html#class-finder">Class Finder Tool</a> to find the perfect class for your child's age and schedule!<br><br>
                    <strong>Step 2:</strong> <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">Create an account</a> in our iClassPro portal<br><br>
                    <strong>Step 3:</strong> Choose your class and complete enrollment - that's it!<br><br>
                    Questions? <a href="pages/contact-dark.html">Contact us</a> - we're here to help! 💚`,
                quickReplies: ['Find a class', 'What programs do you offer?']
            };
        }

        // Location / Address
        if (this.matchesKeywords(lowerMessage, ['where', 'location', 'address', 'directions'])) {
            return {
                text: `<strong>📍 Find Us Here!</strong><br><br>
                    <strong>California Strong Athletics</strong><br>
                    1234 Gymnastics Way<br>
                    Sacramento, CA 95815<br><br>
                    <a href="https://maps.google.com" target="_blank">Get Directions</a><br><br>
                    <strong>Hours:</strong> Check our <a href="pages/contact-dark.html">contact page</a> for current hours and class schedules!`,
                quickReplies: ['Class schedule?', 'How do I enroll?']
            };
        }

        // Schedule / Hours
        if (this.matchesKeywords(lowerMessage, ['schedule', 'hours', 'when', 'time', 'open'])) {
            return {
                text: `<strong>📅 Class Schedule</strong><br><br>
                    We offer classes throughout the week! The best way to find the perfect time for your child is to use our <a href="index-merged.html#class-finder">Class Finder Tool</a>.<br><br>
                    Just enter your child's age and preferred days, and we'll show you all available options! 🎯<br><br>
                    <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">View Full Schedule</a>`,
                quickReplies: ['Find a class', 'How do I enroll?']
            };
        }

        // Ages / Age Groups
        if (this.matchesKeywords(lowerMessage, ['age', 'old', 'year'])) {
            return {
                text: `<strong>👶 Age Groups</strong><br><br>
                    <strong>Kinder Gym:</strong> 2.5 - 5.5 years<br>
                    <strong>Recreational Programs:</strong> 5.5 - 14 years<br>
                    <strong>Tumbling:</strong> 5.5 - 14 years<br><br>
                    Not sure which program fits your child? Use our <a href="index-merged.html#class-finder">Class Finder</a> to get personalized recommendations! 🎯`,
                quickReplies: ['Find a class', 'What programs do you offer?']
            };
        }

        // Trial / First Class
        if (this.matchesKeywords(lowerMessage, ['trial', 'try', 'first class', 'free class'])) {
            return {
                text: `<strong>🎉 Try Us Out!</strong><br><br>
                    We offer trial classes so you can experience Cal Strong before committing! Plus, we have a <strong>30-day money-back guarantee</strong> - if you're not satisfied in your first month, we'll refund 100%. No questions asked! 💚<br><br>
                    <a href="pages/trial-dark.html">Schedule a Trial</a> | <a href="https://app.iclassipro.com/portal/calstrong" target="_blank">Enroll Now</a>`,
                quickReplies: ['How do I enroll?', 'What programs do you offer?']
            };
        }

        // Contact
        if (this.matchesKeywords(lowerMessage, ['contact', 'email', 'phone', 'call', 'reach'])) {
            return {
                text: `<strong>📞 Get In Touch!</strong><br><br>
                    We'd love to hear from you!<br><br>
                    <a href="pages/contact-dark.html">Contact Us</a> - Fill out our contact form and we'll get back to you quickly!<br><br>
                    You can also visit us in person or call during business hours. We're here to help! 💚`,
                quickReplies: ['Where are you located?', 'Class schedule?']
            };
        }

        // Greetings
        if (this.matchesKeywords(lowerMessage, ['hi', 'hello', 'hey', 'greetings'])) {
            return {
                text: `Hey there! 👋 Great to chat with you! How can I help you today?`,
                quickReplies: ['What programs do you offer?', 'How much does it cost?', 'How do I enroll?']
            };
        }

        // Thanks
        if (this.matchesKeywords(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            return {
                text: `You're very welcome! 🐻💚 Is there anything else I can help you with?`,
                quickReplies: ['What programs do you offer?', 'How do I enroll?', 'No, I'm good!']
            };
        }

        // Default Response
        return {
            text: `Great question! I'm still learning, but I can help you with:<br><br>
                • Program information<br>
                • Pricing details<br>
                • Enrollment process<br>
                • Class schedules<br>
                • Location & contact info<br><br>
                You can also <a href="pages/contact-dark.html">contact our team</a> directly for specific questions! 💚`,
            quickReplies: ['What programs do you offer?', 'How much does it cost?', 'Contact info']
        };
    }

    matchesKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
}

// Initialize Atlas when the page loads
console.log('Atlas: Initializing chatbot...');
const atlas = new AtlasChatbot();
console.log('Atlas: Chatbot initialized!', atlas);
