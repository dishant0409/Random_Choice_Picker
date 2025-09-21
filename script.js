// Get DOM elements
const tags = document.querySelector('.tags');
const textArea = document.getElementById('textarea');
let spans = [];
let isRandomizing = false;

// Listen for Enter key press in textarea
textArea.addEventListener('keydown', (e) => {   
    // Prevent input during randomization
    if (isRandomizing) return;  
    

    const input = e.target.value.trim();
    
    if (e.key === 'Enter') { 
        // Clear existing tags
        removeSpan();
        
        // Add new tags if input is not empty
        if(input !== ''){
            addTag(input);
        } else {
            alert("Enter some values please");
        }
    }
});

// Create span elements from input text
function addTag(input) {
    // Split input by commas
    const values = input.split(',');
    
    // Create a span for each value
    values.forEach(value => {
        const trimmedTag = value.trim();
        if (trimmedTag !== '') {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = trimmedTag;
            tags.appendChild(span);
        }
    });
    
    // Update spans array and start random selection
    spans = [...document.querySelectorAll('.tag')];
    const length = spans.length;
    if (length > 1) {
    random(length, spans);
    } else if (length === 1) {
    spans[0].classList.add('active');
    }
    reset();
}

// Flash through spans and pick a random one
function random(length, spans){
    isRandomizing = true;
    
    // Flash animation - highlight spans one by one
    const flashInterval = setInterval(() => {
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('active');
                setTimeout(() => {
                    span.classList.remove('active');
                }, 100);
            }, index * 50); // 50ms delay between each span
        });
    }, 500);

    // Stop flashing after 3 seconds
    setTimeout(() => {
        clearInterval(flashInterval);
        
        // Wait a bit more then select final random span
        setTimeout(() => {
            const currentSpans = document.querySelectorAll('.tag');
            console.log('Fresh spans found:', currentSpans.length);
            
            if (currentSpans.length > 0) {
                // Clear all active classes
                currentSpans.forEach(span => span.classList.remove('active'));
                
                // Pick and highlight random span
                const randNum = Math.floor(Math.random() * currentSpans.length);
                const randSpan = currentSpans[randNum];
                console.log('Selected span:', randSpan.textContent);
                randSpan.classList.add('active');
            }
            
            isRandomizing = false;
        }, 200);
        
    }, 3000);
}

// Clear textarea after processing
function reset() {
    setTimeout(() =>{
        textArea.value = '';
    }, 1)
}

// Remove all existing span elements
function removeSpan() {
    const spans = document.querySelectorAll('.tag');
    spans.forEach(span => {
        span.remove();
    });
}

