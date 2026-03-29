document.addEventListener("DOMContentLoaded", function() {
    const promptEl = document.getElementById("prompt");
    const resultEl = document.getElementById("result");

    let round = 0;
    const maxRounds = 5;
    let sequence = [];
    let userInput = [];
    let startTime = 0;

    // Generate random sequence of letters A-Z
    function randomSequence(length) {
        const seq = [];
        for (let i = 0; i < length; i++) {
            seq.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
        }
        return seq;
    }

    function nextRound() {
        if (round >= maxRounds) {
            promptEl.textContent = "🎉 Challenge Complete!";
            return;
        }

        round++;
        sequence = randomSequence(round + 2);
        userInput = [];
        promptEl.textContent = `Round ${round}: ${sequence.join(" → ")}`;
        startTime = Date.now();
    }

    document.addEventListener("keydown", (e) => {
        const key = e.key.toUpperCase();

        // Start game on SPACE
        if (round === 0 && e.code === "Space") {
            nextRound();
            return;
        }

        if (round > 0 && sequence.length) {
            userInput.push(key);

            // Check sequence
            for (let i = 0; i < userInput.length; i++) {
                if (userInput[i] !== sequence[i]) {
                    resultEl.textContent += `Round ${round}: ❌ Wrong key! Expected ${sequence[i]}, got ${userInput[i]}\n`;
                    nextRound();
                    return;
                }
            }

            // Completed sequence
            if (userInput.length === sequence.length) {
                const reactionTime = Date.now() - startTime;
                resultEl.textContent += `Round ${round}: ✅ Correct in ${reactionTime} ms\n`;
                nextRound();
            }
        }
    });
});
