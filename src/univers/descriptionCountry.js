import React from 'react';

function DescriptionCountry () {

    function chooseCountry () {
        const [country, setCountry] = useState(null);
    }
  
        const descriptionCountry = [
            {
                name: "Pays aristocrate",
                description : "La description du pays aristocrate est à venir"
            },
            {
                name: "Pays théologue",
                description : "La description théologue est à venir"
            },
            {
                name: "San Franciscain",
                description : "La description de San Franciscain est à venir"
            },
            {
                name: "Vagabonds d'Ulga",
                description : "La description des Vagabonds est à venir"
            },
            {
                name: "Atelys",
                description : 'Large archipel de sept millions d\'âmes, à la croisée des routes maritimes du continent, Atelys est une terre où la richesse et la cruauté travaillent main dans la main. Le gouvernement n\'ayant qu’un poids minimal, il est alors commun d’affirmer que les véritables maîtres de l’île sont les nombreuses entreprises commerciales qui s’affrontent à coups de négociations, d’échanges, d’alliances, de rachats et quelques fois, d’actes criminels. Pas une once de terrain n’échappe à leur contrôle et ce sont elles qui imposent leurs lois aux villages et villes qu’elles ont obtenu à la chute d’une de leurs rivales ou à l’achat habile d’un domaine bien situé. La géopolitique des îles constitue un immense chaos que seuls des comptables et notaires aguerris peuvent suivre, de chiffres en chiffres. On peut comprendre que les corporations les plus importantes de l’île représentent cette dernière dans ses rapports avec le monde extérieur. Les dirigeants se déplacent sur le continent pour superviser eux-mêmes les plus grands accords. Si le continent voit d’un mauvais oeil cet étrange archipel obsédé par le profit, Atelys reste protégée de toute invasion sur deux flancs : sa flotte navale qui la protège est inégalée, et les pertes commerciales qui découleraient d’une invasion mettraient à mal l’envahisseur tout en incitant les autres nations à la défendre. Ici, vous n’êtes rien si vous n’apportez à votre guilde que votre présence. On demande de l’effort, des idées, des compétences, de la motivation, que vous dédiez tout à votre corporation. On place le mérite comme la plus haute des valeurs, si bien qu’un individu, des guildes ou des villages productifs peuvent être énormément demandés, leur donnant un pouvoir certain dans les négociations avec leurs futurs employeurs. Il est alors évident de comprendre que dans l’archipel, les harmonistaires sont énormément désirés et disposent de statuts et de salaires privilégiés, notamment ceux qui contrôlent les eaux ou les vents, pouvant rendre un trajet maritime plus serein ou plus rapide. Les harmonistaires sont alors très bien traités dans l’archipel mais leur maîtrise leur est demandée d’évoluer sous les contraintes de leurs missions plutôt que des philosophies d’antan. En résulte alors un corps de maîtres ultra-spécialisés dans la réalisation des tâches demandées, mais qui peinent à développer leurs dons de manière globale. La date la plus importante de l’archipel est l’équinoxe d’hiver ; c’est à cette date que seront résolues d’une manière singulière deux importants problèmes structurels à ce système économique. Tout d’abord, comme chaque parcelle de terrain appartient à une organisation, cela empêche de nouvelles entreprises de voir le jour. Et secondement, si une entreprise qui a amassé de nombreuses ressources se met à rentrer en déficit, rien pour le moment ne peut l’obliger à corriger le tir. Ainsi, il est organisé à chaque équinoxe d’hiver une vente aux enchères gigantesque où les frontières sont réévaluées selon les bénéfices de l’année, obligeant les firmes ayant un résultat moyen de céder une partie de leurs ressources à des concurrents ou de nouveaux arrivants. Les cartes géopolitiques sont alors complètement rebattues entre les différents conglomérats, entraînant un nombre de troubles avant et après l’équinoxe dans un pays pourtant déjà bien chargé en complots. Même si le gouvernement technocrate joue un rôle discret dans l\'archipel, c’est à lui que revient tout de même la charge d’organiser la vente aux enchères annuelles, et aussi de régler les litiges entre différentes compagnies. Manquant généralement de commissaires, il n’est pas rare qu’il recrute des hommes parmi d’autres guildes tiers non liées aux conflits afin de tirer les affaires au clair devant les tribunaux - elles seront alors grassement récompensées lors du prochain équinoxe. Mais interrogez les maîtres des firmes et ils vous diront tous que le rôle le plus important du Collège est d’évaluer les terrains, faisant des comptables qui y statuent, la profession la plus respectée et crainte de tout Atelys. Il faut aussi noter que chaque dirigeant d’entreprise a le droit de siéger au Forum où ils prennent des décisions conjointes sur l’avenir du pays, chaque voix pesant dans le vote selon la puissance de la corporation représentée. L’archipel compte en plus dans son sein une nouvelle forme d’organisation baptisée le syndicat. Considérée comme une mafia par les firmes, le syndicat a pour but de mettre l’humain au centre des préoccupations de l’archipel plutôt que l’entreprise. Elle n’hésite pas à mener des attaques terroristes pour faire valoir ses revendications, surtout à l’approche de l’équinoxe d’hiver quand les entreprises sont les plus vulnérables ; ainsi, les syndicats peuvent à la fois leur faire perdre des ressources et les faire manquer leurs objectifs annuels, une double catastrophe. Il ne vaut mieux pas savoir ce qui arrive à un membre du syndicat quand il est capturé par une firme… A moins qu’il ne soit relâché sous la promesse de chahuter la concurrence… Atelys est en définitive un immense panier de crabes. Terres d’opportunités mais aussi de complots, de grandes corporations influentes aux pieds d’argile, où la morale se monnaie, où l’argent coule à flots… Tout le monde a le droit à une seconde chance à Atelys ; mais très peu y gagneront au change.'
            },
            {
                name: "Nomades Sarnaï",
                description : "La description des Nomades est à venir"
            },
            {
                name: "Pays technologique",
                description : "La description du pays Technologique est à venir"
            },
            {
                name: "Pays des montagnes",
                description : "La description du pays des Montagnes est à venir"
            }
        ];
        const selectCountry = (index) => {
            setCountry(index);
        }

}

export default DescriptionCountry;


const descriptionCountry = [
    {
        name: "Pays aristocrate",
        description : "La description du pays aristocrate est à venir"
    },
    {
        name: "Pays théologue",
        description : "La description théologue est à venir"
    },
    {
        name: "San Franciscain",
        description : "La description de San Franciscain est à venir"
    },
    {
        name: "Vagabonds d'Ulga",
        description : "La description des Vagabonds est à venir"
    },
    {
        name: "Atelys",
        description : 'Large archipel de sept millions d\'âmes, à la croisée des routes maritimes du continent, Atelys est une terre où la richesse et la cruauté travaillent main dans la main. Le gouvernement n\'ayant qu’un poids minimal, il est alors commun d’affirmer que les véritables maîtres de l’île sont les nombreuses entreprises commerciales qui s’affrontent à coups de négociations, d’échanges, d’alliances, de rachats et quelques fois, d’actes criminels. Pas une once de terrain n’échappe à leur contrôle et ce sont elles qui imposent leurs lois aux villages et villes qu’elles ont obtenu à la chute d’une de leurs rivales ou à l’achat habile d’un domaine bien situé. La géopolitique des îles constitue un immense chaos que seuls des comptables et notaires aguerris peuvent suivre, de chiffres en chiffres. On peut comprendre que les corporations les plus importantes de l’île représentent cette dernière dans ses rapports avec le monde extérieur. Les dirigeants se déplacent sur le continent pour superviser eux-mêmes les plus grands accords. Si le continent voit d’un mauvais oeil cet étrange archipel obsédé par le profit, Atelys reste protégée de toute invasion sur deux flancs : sa flotte navale qui la protège est inégalée, et les pertes commerciales qui découleraient d’une invasion mettraient à mal l’envahisseur tout en incitant les autres nations à la défendre. Ici, vous n’êtes rien si vous n’apportez à votre guilde que votre présence. On demande de l’effort, des idées, des compétences, de la motivation, que vous dédiez tout à votre corporation. On place le mérite comme la plus haute des valeurs, si bien qu’un individu, des guildes ou des villages productifs peuvent être énormément demandés, leur donnant un pouvoir certain dans les négociations avec leurs futurs employeurs. Il est alors évident de comprendre que dans l’archipel, les harmonistaires sont énormément désirés et disposent de statuts et de salaires privilégiés, notamment ceux qui contrôlent les eaux ou les vents, pouvant rendre un trajet maritime plus serein ou plus rapide. Les harmonistaires sont alors très bien traités dans l’archipel mais leur maîtrise leur est demandée d’évoluer sous les contraintes de leurs missions plutôt que des philosophies d’antan. En résulte alors un corps de maîtres ultra-spécialisés dans la réalisation des tâches demandées, mais qui peinent à développer leurs dons de manière globale. La date la plus importante de l’archipel est l’équinoxe d’hiver ; c’est à cette date que seront résolues d’une manière singulière deux importants problèmes structurels à ce système économique. Tout d’abord, comme chaque parcelle de terrain appartient à une organisation, cela empêche de nouvelles entreprises de voir le jour. Et secondement, si une entreprise qui a amassé de nombreuses ressources se met à rentrer en déficit, rien pour le moment ne peut l’obliger à corriger le tir. Ainsi, il est organisé à chaque équinoxe d’hiver une vente aux enchères gigantesque où les frontières sont réévaluées selon les bénéfices de l’année, obligeant les firmes ayant un résultat moyen de céder une partie de leurs ressources à des concurrents ou de nouveaux arrivants. Les cartes géopolitiques sont alors complètement rebattues entre les différents conglomérats, entraînant un nombre de troubles avant et après l’équinoxe dans un pays pourtant déjà bien chargé en complots. Même si le gouvernement technocrate joue un rôle discret dans l\'archipel, c’est à lui que revient tout de même la charge d’organiser la vente aux enchères annuelles, et aussi de régler les litiges entre différentes compagnies. Manquant généralement de commissaires, il n’est pas rare qu’il recrute des hommes parmi d’autres guildes tiers non liées aux conflits afin de tirer les affaires au clair devant les tribunaux - elles seront alors grassement récompensées lors du prochain équinoxe. Mais interrogez les maîtres des firmes et ils vous diront tous que le rôle le plus important du Collège est d’évaluer les terrains, faisant des comptables qui y statuent, la profession la plus respectée et crainte de tout Atelys. Il faut aussi noter que chaque dirigeant d’entreprise a le droit de siéger au Forum où ils prennent des décisions conjointes sur l’avenir du pays, chaque voix pesant dans le vote selon la puissance de la corporation représentée. L’archipel compte en plus dans son sein une nouvelle forme d’organisation baptisée le syndicat. Considérée comme une mafia par les firmes, le syndicat a pour but de mettre l’humain au centre des préoccupations de l’archipel plutôt que l’entreprise. Elle n’hésite pas à mener des attaques terroristes pour faire valoir ses revendications, surtout à l’approche de l’équinoxe d’hiver quand les entreprises sont les plus vulnérables ; ainsi, les syndicats peuvent à la fois leur faire perdre des ressources et les faire manquer leurs objectifs annuels, une double catastrophe. Il ne vaut mieux pas savoir ce qui arrive à un membre du syndicat quand il est capturé par une firme… A moins qu’il ne soit relâché sous la promesse de chahuter la concurrence… Atelys est en définitive un immense panier de crabes. Terres d’opportunités mais aussi de complots, de grandes corporations influentes aux pieds d’argile, où la morale se monnaie, où l’argent coule à flots… Tout le monde a le droit à une seconde chance à Atelys ; mais très peu y gagneront au change.'
    },
    {
        name: "Nomades Sarnaï",
        description : "La description des Nomades est à venir"
    },
    {
        name: "Pays technologique",
        description : "La description du pays Technologique est à venir"
    },
    {
        name: "Pays des montagnes",
        description : "La description du pays des Montagnes est à venir"
    }
];