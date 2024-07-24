function calculateBMI() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const heightCm = parseFloat(document.getElementById('height').value);
    const weightKg = parseFloat(document.getElementById('weight').value);

    if (!heightCm || !weightKg) {
        alert('Please enter valid height and weight values.');
        return;
    }

    const heightMeters = heightCm / 100; // Convert height to meters
    const bmi = weightKg / (heightMeters * heightMeters);
    updateMeter(bmi);

    let bmiCategory;
    let healthyWeightMin;
    let healthyWeightMax;
    let advice;

    if (bmi < 18.5) {
        bmiCategory = "Underweight";
        advice = "It's important to eat a balanced diet and consult with a healthcare provider.";
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = "Normal";
        advice = "Great job! Keep maintaining a healthy lifestyle.";
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = "Overweight";
        advice = "Consider adopting a healthier diet and more physical activity.";
    } else if (bmi >= 30 && bmi < 35) {
        bmiCategory = "Obesity";
        advice = "It's important to consult with a healthcare provider for personalized advice.";
    }
    else if (bmi >= 35) {
        bmiCategory = "Extreme Obesity";
        advice = "It's important to consult with a healthcare provider for personalized advice.";
    }

    healthyWeightMin = 18.5 * heightMeters * heightMeters;
    healthyWeightMax = 25 * heightMeters * heightMeters;

    const bmiPrime = bmi / 25;
    const ponderalIndex = weightKg / Math.pow(heightMeters, 3);

    document.getElementById('result').innerHTML = `
        <p>BMI = ${bmi.toFixed(1)} kg/m<sup>2</sup> (${bmiCategory})</p>
        <p>Healthy BMI range: 18.5 kg/m<sup>2</sup> - 25 kg/m<sup>2</sup></p>
        <p>Healthy weight for the height: ${healthyWeightMin.toFixed(1)} kg - ${healthyWeightMax.toFixed(1)} kg</p>
        <p>BMI Prime: ${bmiPrime.toFixed(2)}</p>
        <p>Ponderal Index: ${ponderalIndex.toFixed(1)} kg/m<sup>3</sup></p>
        <p>${advice}</p>
    `;

    playAudio(bmiCategory);
}


function updateMeter(bmi) {
    let angle;
    if (bmi < 18.5) {
        angle = -85; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
        angle = -45; // Normal
    } else if (bmi >= 25 && bmi < 30) {
        angle = 0; // Overweight
    } else if (bmi >= 30 && bmi < 35) {
        angle = 45; // Obesity
    } else if (bmi >= 35) {
        angle = 85; // Extreme Obesity
    } else {
        return; // Invalid value
    }
    document.getElementById('needle').style.transform = `rotate(${angle}deg)`;
}


function playAudio(bmiCategory) {
    const audio = new Audio(`audio/${bmiCategory}.mp3`);
    audio.play();
}