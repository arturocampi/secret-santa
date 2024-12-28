document.addEventListener('DOMContentLoaded', () => {
    const participants = [];

    const phrases = [
        "Felicidades Saul",
        "Monooooooooooooooo",
        "Xabi chandal",
        "Soy tu culo, soy tu ano",
        "Que miras pepino",
        "Prosegur no participa aquí",
        "Ya aprenderás pequeño",
    ];

    let emailsSentState = true;

    document.getElementById('addParticipantBtn').addEventListener('click', () => {
        const name = document.getElementById('participantName').value.trim();
        const email = document.getElementById('participantEmail').value.trim();

        if (name && email) {
            participants.push({ name, email });
            updateParticipantList();
            document.getElementById('participantName').value = '';
            document.getElementById('participantEmail').value = '';
        } else {
            alert('Please enter both name and email.');
        }
    });

    document.getElementById('generateMatchesBtn').addEventListener('click', () => {
        if (participants.length < 2) {
            alert('At least 2 participants are needed.');
            return;
        }
        if (participants.length % 2 !== 0) {
            alert('Participants count is not even. Add another or continue anyway.');
            return;
        }
        generateAndSendMatches();
    });

    function updateParticipantList() {
        const nameList = document.getElementById('participantList');
        nameList.innerHTML = '';
        participants.forEach(({ name, email }, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${name} (${email}) <button class="btn btn-sm btn-warning" onclick="editParticipant(${index})">Edit</button>`;
            nameList.appendChild(li);
        });
    }

    function generateAndSendMatches() {
        const shuffled = [...participants].sort(() => Math.random() - 0.5);

        for (let i = 0; i < shuffled.length; i++) {
            const giver = shuffled[i];
            const receiver = shuffled[(i + 1) % shuffled.length];

            const randomIndex = Math.floor(Math.random() * phrases.length);
            const customPhrase = phrases.splice(randomIndex, 1)[0];

            sendEmail(giver, receiver, customPhrase);
        }
    }

    function sendEmail(giver, receiver, customPhrase) {
        const emailParams = {
            giver_name: receiver.name,
            receiver_name: giver.name,
            receiver_email: receiver.email,
            custom_phrase: customPhrase,
        };

        emailjs.send('service_hyeo70q', 'template_tikoa85', emailParams)
            .then(() => {
                console.log(`Email sent to ${receiver.email}`);
            })
            .catch(error => {
                emailsSentState = false;
                console.error(`Failed to send email to ${receiver.email}:`, error);
            });

    }

    // Check if the mails have been sent
    state ? alert("Correos enviados correctamente.") : alert("Los correos no se han enviado.");

    // Edit Participant (dummy function to wire up edit buttons)
    window.editParticipant = function (index) {
        const participant = participants[index];
        const newName = prompt('Edit name:', participant.name);
        const newEmail = prompt('Edit email:', participant.email);
        if (newName) participants[index].name = newName;
        if (newEmail) participants[index].email = newEmail;
        updateParticipantList();
    };
});
