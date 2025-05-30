export function launcherDices (firstDice, secondDice, thirdDice) {
    
    const firstLaunch = Math.floor(Math.random()*12 + 1);
    const secondLaunch = Math.floor(Math.random()*12 + 1);
    const thirdLaunch = Math.floor(Math.random()*12 + 1);

    function interpretationResult (diceLevel, resultLaunch) {
        switch (diceLevel) {
            case -1:
                switch (resultLaunch) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        return "Echec";
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        return "Neutre";
                    case 12:
                        return "Réussite";
                    default:
                        return "On n'a rien";
                }
            case 0:
                switch (resultLaunch) {
                    case 1:
                    case 2:
                    case 3:
                        return "Echec";
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        return "Neutre";
                    case 10:
                    case 11:
                    case 12:
                        return "Réussite";
                    default:
                        return "On n'a rien";
                }
            case 1:
                switch (resultLaunch) {
                    case 1:
                    case 2:
                        return "Echec";
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        return "Neutre";
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return "Réussite";
                    default:
                        return "On n'a rien";
                }
            case 2:
                switch (resultLaunch) {
                    case 1:
                        return "Echec";
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return "Neutre";
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return "Réussite";
                    default:
                        return "On n'a rien";
                }
                default:
            return "Erreur";
        }
    }

    const firstResult = interpretationResult(firstDice, firstLaunch);
    const secondResult = interpretationResult(secondDice, secondLaunch);
    const thirdResult = interpretationResult(thirdDice, thirdLaunch);

    console.log(firstResult)
    console.log(secondResult)
    console.log(thirdResult)

    const results = [firstResult, secondResult, thirdResult];

    return results;
}