import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import harmonistereColumn from '../images/harmonistereColumn.jpg';
import harmonistereColumnTwo from '../images/harmonistereColumnTwo.jpg';
import "./univers.css";

function Univers() {
  const [country, setCountry] = useState(null);

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
        description : `   Il existe dans [nom du continent] un groupe d’individus à qui il est difficile de poser un nom… Ils sont trop dispersés pour être appelés une confrérie ou des compagnons, trop anarchistes pour les considérer comme un ordre ou une guilde, trop scientifiques pour être vus comme un culte, trop artistes pour être vus comme des scientifiques. Et certains diraient même qu’ils sont trop acharnés pour être des humains.
        De toute la terre de [nom du continent] rien ne semble plus étrange, ni ne suscite plus de rejet et de fascination, que les vagabonds d’Ulga.
        
           Il n’y aurait qu’une chose à dire, nous dirions ceci : ils cherchent à détruire la grande tornade. Rien d’autre ne compte pour eux que cet objectif, un véritable sacerdoce absolu qui construit et guide toute la mentalité et la culture des Ulga.
        
           On pourrait grossièrement les résumer comme des Sarnaï radicaux. Ce qu’ils sont historiquement parlant, car suite à l’exode des Sarnaï, une nouvelle dissension a eu lieu sur le motif que ceux-ci cherchaient trop à apprendre de la tornade sans oser s’en approcher, alors qu’il faudrait au contraire l’affronter directement. Ceux qui considéraient cette approche comme scientifique sont partis, ceux qui les traitaient de fous sont restés. Ainsi sont nés les vagabonds d’Ulga, du nom de cette ancienne rivière où la rupture a eu lieu.
        
           Au fil des siècles, les Vagabonds se sont aiguisés au fil de leur objectif suprême. Leur philosophie de confrontation directe les a poussés à concevoir la tornade comme un ennemi à supprimer plutôt qu’à comprendre ; la foi, pourtant un élément majeur des [peuple théologien] et des Sarnaï, inutile dans ce grand affrontement, ne subsiste qu’à peine comme un animisme parmi quelques-uns de ses membres ; quant à la relation avec le reste de la civilisation, il n’est qu’intéressé : c’est en elle que se trouvent les richesses, les technologies et les hommes nécessaires à la réussite de leur mission, alors c’est ici que de temps en temps, ils doivent investir du temps pour se les approprier, par la négociation ou la force.
        
           Tout le monde se méfie des Ulga. Il serait bête de croire l’inverse. Et heureusement, leurs tentatives toujours infructueuses de passer par la tornade laissent toujours assez de marques pour les identifier : des sillons de sable coupants sur la peau et le visage, des cicatrices d’impacts de roches, et leur ample cape abîmée, censée les protéger sous les rafales. Pris par un enjeu de sauvetage du monde, ils se considèrent au-dessus ou au-dessous des lois et acceptent toutes les missions de mercenariat que la moralité ou l’instinct de survie des Sarnaï leur empêchent d’accepter, quand ils ne vont pas piller eux-même les coffres et les poches des habitants.
        
           On peut trouver le Vagabond seul, en duo, avec un apprenti ou en groupe ; ils vont et viennent entre eux au gré des vents et des besoins. Ils savent manifestement où et comment se retrouver, échangent sur leurs avancées, parlent de leurs projets à venir, demandent de l’aide, s’accompagnent, profitent des réseaux ou des connaissances des uns et des autres. Un étrange sentiment les lie, car bien qu’ils puissent se croiser peu de fois, voire jamais, ils sont capables de la plus grande cohésion lors des retrouvailles. Ils savent qu’ils ne vivront pas vieux ; que leurs cicatrices ne sont que des traces d’une Mort qui est passée près d’eux ; que dire au-revoir à un Vagabond signifie bien souvent un adieu ; que la seule chose qui leur donne un semblant d’espérance de vie est la recherche des ressources nécessaires pour lancer un nouveau corps d’expédition, ou l’apprentissage majoritairement oral des novices qui rejoignent leurs rangs après de longues recherches.
        
           S’il y a bien une chose - outre l’obsession pour la monstrueuse tornade - que les Vagabonds ont gardé de leur ancien peuple, c’est le goût de l’art et des célébrations. Il faut bien que leur mystérieux et pesant mode de vie, entre le monde des vivants et la bouche de la tornade, puisse s’exprimer d’une manière ou d’une autre. Par des chants nouveaux, des nouvelles manières d’aborder le théâtre, ils sont aussi des explorateurs des arts. Très peu sont capables de comprendre la profondeur et la vitalité de leurs démarches artistiques ; on y associe plus souvent du bruit, de l’orgueil, de l’anarchisme. Pourtant, les grands artistes assez ouverts d’esprit se rendent compte de la richesse de leur répertoire et du caractère novateur des Ulga, et finissent invariablement par s’en inspirer. Avant de se lever le matin et se rendre compte qu’on leur a volé leurs bijoux, leur monnaie et que les artistes ont disparu bien avant l’aube.
        
           Mais il serait avisé de ne pas les voir que comme des brutes, des voleurs et des saltimbanques. Tout comme les Sarnaï, ils ont un cœur de scientifique avant tout et sont motivés par les progrès. Pour être certain que l’oralité ne leur fasse pas défaut, ils ont fabriqué des bibliothèques souterraines, aux localisations secrètes connues d’eux seuls, dans lesquelles ils consignent tous leurs écrits. Réparties au nord-est du continent, soit proche de la tornade, c’est par elles qu’ils apprennent à détecter les rafales les plus meurtrières et comment s’en approcher. Qu’ils connaissent les lieux où la terre n’est pas encore réduite à l’état de purée de sable et où on peut encore y planter des bâtons encordés qui peuvent tenir quelques jours. Qu’il existe bel et bien plusieurs niveaux dans la tornade et que plus on se rapproche du centre, plus les dangers se renforcent et plus on y sent la magie à la naissance de la catastrophe.
        
           Car enfin, s’il y a bien une personne qui peut se guider à l’intérieur des couches de la tornade, c’est bien eux. Les Ulgas sont passés maîtres dans l’art de vivre dedans et de savoir quand reculer et quand avancer. Ils connaissent la forme des véhicules qui ont le plus de chances de ne pas se faire embarquer par les vents, les maîtrises élémentaires les plus intéressantes à leur survie. Quand on peut creuser un tunnel ou quand le sable deviendra trop dangereux. Ils ont adopté des systèmes de pilons dans les zones les plus sûres, ce qu’il fait qu’ils se considèrent bien souvent comme des alpinistes horizontaux.
        
           Voici brièvement qui sont les Ulgas. Des vagabonds en-dehors de la société, flirtant constamment avec la mort, avec la tornade comme raison d’exister et de mourir. Bourru ou explosif, voleur ou mielleux, solitaire ou harnaché à ses compagnons, ils se définissent avant tout comme des survivants et des sauveurs. Qu’on leur crache dans le dos, qu’on les méprise, qu’on les craigne. A la fin, ils ne savent qu’une chose : ils détruiront la tornade, et disparaîtront avec elle.
        `
    },
    {
        name: "Atelys",
        description : `   Large archipel de sept millions d'âmes, à la croisée des routes maritimes du continent, Atelys est une terre où la richesse et la cruauté travaillent main dans la main.
      
           Le gouvernement n'ayant qu’un poids minimal, il est alors commun d’affirmer que les véritables maîtres de l’île sont les nombreuses entreprises commerciales qui s’affrontent à coups de négociations, d’échanges, d’alliances, de rachats et quelques fois, d’actes criminels. Pas une once de terrain n’échappe à leur contrôle et ce sont elles qui imposent leurs lois aux villages et villes qu’elles ont obtenu à la chute d’une de leurs rivales ou à l’achat habile d’un domaine bien situé. La géopolitique des îles constitue un immense chaos que seuls des comptables et notaires aguerris peuvent suivre, de chiffres en chiffres.
        
           On peut comprendre que les corporations les plus importantes de l’île représentent cette dernière dans ses rapports avec le monde extérieur. Les dirigeants se déplacent sur le continent pour superviser eux-mêmes les plus grands accords. Si le continent voit d’un mauvais oeil cet étrange archipel obsédé par le profit, Atelys reste protégée de toute invasion sur deux flancs : sa flotte navale qui la protège est inégalée, et les pertes commerciales qui découleraient d’une invasion mettraient à mal l’envahisseur tout en incitant les autres nations à la défendre.
           
          Ici, vous n’êtes rien si vous n’apportez à votre guilde que votre présence. On demande de l’effort, des idées, des compétences, de la motivation, que vous dédiez tout à votre corporation. On place le mérite comme la plus haute des valeurs, si bien qu’un individu, des guildes ou des villages productifs peuvent être énormément demandés, leur donnant un pouvoir certain dans les négociations avec leurs futurs employeurs. Il est alors évident de comprendre que dans l’archipel, les harmonistaires sont énormément désirés et disposent de statuts et de salaires privilégiés, notamment ceux qui contrôlent les eaux ou les vents, pouvant rendre un trajet maritime plus serein ou plus rapide. Les harmonistaires sont alors très bien traités dans l’archipel mais leur maîtrise leur est demandée d’évoluer sous les contraintes de leurs missions plutôt que des philosophies d’antan. En résulte alors un corps de maîtres ultra-spécialisés dans la réalisation des tâches demandées, mais qui peinent à développer leurs dons de manière globale.

          La date la plus importante de l’archipel est l’équinoxe d’hiver ; c’est à cette date que seront résolues d’une manière singulière deux importants problèmes structurels à ce système économique. Tout d’abord, comme chaque parcelle de terrain appartient à une organisation, cela empêche de nouvelles entreprises de voir le jour. Et secondement, si une entreprise qui a amassé de nombreuses ressources se met à rentrer en déficit, rien pour le moment ne peut l’obliger à corriger le tir. Ainsi, il est organisé à chaque équinoxe d’hiver une vente aux enchères gigantesque où les frontières sont réévaluées selon les bénéfices de l’année, obligeant les firmes ayant un résultat moyen de céder une partie de leurs ressources à des concurrents ou de nouveaux arrivants. Les cartes géopolitiques sont alors complètement rebattues entre les différents conglomérats, entraînant un nombre de troubles avant et après l’équinoxe dans un pays pourtant déjà bien chargé en complots.
          
          Même si le gouvernement technocrate joue un rôle discret dans l\'archipel, c’est à lui que revient tout de même la charge d’organiser la vente aux enchères annuelles, et aussi de régler les litiges entre différentes compagnies. Manquant généralement de commissaires, il n’est pas rare qu’il recrute des hommes parmi d’autres guildes tiers non liées aux conflits afin de tirer les affaires au clair devant les tribunaux - elles seront alors grassement récompensées lors du prochain équinoxe. Mais interrogez les maîtres des firmes et ils vous diront tous que le rôle le plus important du Collège est d’évaluer les terrains, faisant des comptables qui y statuent, la profession la plus respectée et crainte de tout Atelys. Il faut aussi noter que chaque dirigeant d’entreprise a le droit de siéger au Forum où ils prennent des décisions conjointes sur l’avenir du pays, chaque voix pesant dans le vote selon la puissance de la corporation représentée.
          
          L’archipel compte en plus dans son sein une nouvelle forme d’organisation baptisée le syndicat. Considérée comme une mafia par les firmes, le syndicat a pour but de mettre l’humain au centre des préoccupations de l’archipel plutôt que l’entreprise. Elle n’hésite pas à mener des attaques terroristes pour faire valoir ses revendications, surtout à l’approche de l’équinoxe d’hiver quand les entreprises sont les plus vulnérables ; ainsi, les syndicats peuvent à la fois leur faire perdre des ressources et les faire manquer leurs objectifs annuels, une double catastrophe. Il ne vaut mieux pas savoir ce qui arrive à un membre du syndicat quand il est capturé par une firme… A moins qu’il ne soit relâché sous la promesse de chahuter la concurrence…
          
          Atelys est en définitive un immense panier de crabes. Terres d’opportunités mais aussi de complots, de grandes corporations influentes aux pieds d’argile, où la morale se monnaie, où l’argent coule à flots… Tout le monde a le droit à une seconde chance à Atelys ; mais très peu y gagneront au change.`
    },
    {
        name: "Nomades Sarnaï",
        description : `   Suite au Schisme qui a divisé [nom du pays] en trois factions, deux groupes nomades ont alors quitté le pays. Le plus grand d’entre-eux et le plus connu est appelé Sarnaï. Chaque habitant, dès sa naissance, n’a alors qu’un seul objectif : protéger la Caravane, arpenter le continent et comprendre la nature de la Tornade qui ronge le Nord.

        Imaginez-voir passer près de votre bourg une ville entière de plusieurs milliers de personnes sous vos yeux, avec ce que ça compte d’enfants, de charrettes gigantesques et d’animaux de toute espèce, chevaux, ânes, veaux, cochons. Car ainsi va la principale caravane Sarnaï : avec sept mille têtes. Plus de cohortes encore parcourent le monde de leur côté, portant le nombre total de ce curieux groupe à douze mille.
     
        Réussir à gérer autant de ressources mobiles représente un défi de taille. Pour le résoudre, les caravaniers ont adopté un système hiérarchique simple mais implacable. Tout d’abord, les nomades sont répartis en différents groupes qui élisent leur chef, qui porte alors le rôle de représentant et de responsable. Ses ordres sont absolus ; la discorde est une des pires choses qui puisse arriver chez les Sarnaï. S’ils ont besoin d’aide, ils peuvent demander conseil à la Concorde des Sages, des personnes généralement âgées qui ont prouvé leurs compétences et marqué de leurs décisions et découvertes l’ensemble des Nomades. Ils n’ont cependant aucun pouvoir décisionnaire, ils se contentent d’aiguiller ; seule exception, ils rendent les jugements en cas de conflits entre les individus. Quand il le faut, les Sages peuvent choisir un responsable spécial qui aura la charge de résoudre un problème particulier, et devra accomplir sa mission en bonne entente avec les chefs et ses subordonnés, selon ses besoins.
     
        Chez les nomades, la communauté et la solidarité sont les maîtres-mots, car la survie de tous passe par la bonne-entente, l’écoute et la confiance. L	a logistique des biens est primordiale, tout comme les compétences de chaque personne, si bien que les individualités peuvent être écrasées au besoin les mauvaises années. Tous ne parviennent pas à suivre ce rythme de vie et préfèrent rejoindre un des villages ou cités qu’il avait trouvé charmant la dernière fois qu’il était passé devant. A l’inverse, des étrangers peuvent après avoir prouvé leur valeur, être acceptés comme s’ils étaient nés dans la colonie.
     
        Les Nomades se fichent de voir leur colonie grossir en hommes ou en richesses : seules comptent la survie et la recherche. Ainsi, chaque bien est collectivisé et soigneusement réparti par les chefs selon les besoins de chaque groupe sous le signe de la compréhension et de la conciliation.
     
        En plus de leurs propres ressources, les caravaniers n’hésitent jamais à soumettre leurs services et expertises aux villages qui les demandent. Ils acceptent bon nombre de missions allant de la traque, aux soins aux malades, en passant par des services postaux. Souvent accusés à tort de vols ou de charlatanisme au début de leur grand voyage, ils ont acquis à la force de ces missions et des écrits faits sur eux de l’intérieur par des chercheurs, écrivains et poètes, une réputation sérieuse faisant qu’ils sont maintenant reçus comme des bonnes nouvelles et majoritairement appréciés des populations. On les imagine même, romanesques, toujours à l’aventure, à suivre le vent. Cette imagerie est supportée par les nombreux spectacles qu’ils présentent aux villes et villages environnants : troupes de théâtre, acrobates, musiciens, les Sarnaï mettent toujours un point d’honneur à animer les foules près desquelles ils passent.
     
        Car pourquoi se faire des ennemis quand on est à la poursuite du plus grand mystère du monde ? La quête des Sarnaï est claire : comprendre la Tornade. D’où elle vient, ce qu’elle veut, découvrir son début, anticiper sa fin. Tout savoir. En bref, tout en la respectant comme une déité, ils cherchent à approcher la Tornade d’un point de vue scientifique, ce qui fait curieusement des Nomades la plus grande concentration de savants du globe. Ils comptent dans leurs rangs les meilleurs géologues, herboristes, cartographes, zoologistes et tant encore. C’est leur théologie particulière qui les pousse à aborder le monde par la science : considérant la tornade comme un fruit du monde, ils sont intimement convaincus qu’en comprenant entièrement ce dernier, ils en déduiront naturellement toutes les informations qu’ils cherchent.
     
        Les secrets, voilà bien leurs ressources les plus précieuses, ce dont ils sont les plus avides. Partir à la recherche de ruines ancestrales que nul n’a jamais réussi à traduire, récolter les artefacts les plus précieux ou étranges, explorer des terres où nul n’a jamais mis les pieds. Si les Sarnaï vagabondent, c’est pour écouter toutes ces rumeurs, rassembler les légendes de chaque pays, comprendre à la racine les danses et mouvements des harmonistères. Et c’est en rendant service aux autres peuples qu’ils amassent assez de ressources pour organiser des expéditions plus dangereuses, financer des travaux et des thèses ou monter des campements casaniers sur certains sites du passé.
     
        Entre aventures et devoirs, la quête des Sarnaï et ainsi leur voyage semble sans fin d’un œil extérieur. Grands explorateurs, scientifiques de renoms, chaque homme et femme est un rouage de plus vers la compréhension de leur monde, partagés entre une vie difficile et une quête de sens collective. Ils font maintenant partie du paysage du continent depuis des siècles et pour le reste du monde, ainsi seront-ils encore plusieurs siècles après, tels les nuages. Mais eux, battant la campagne, affrontant les pluies torrentielles, les plus grands froids et les rationnements, eux portent encore l’espoir de leurs ancêtres qui, ensemble, prenaient la route pour la première fois hors de [pays théologie].
     `
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

  return (
    <div id="universTotal">
      <div className='columnContainer'>
        <img src={harmonistereColumn} alt="Paysage vertical" className="universeColumnImg" />
      </div>
  
      <div id="contenuUnivers">
        <Navbar width="50%" />
        <h1 id="universeTitle">Les pays de l'univers</h1>
        <div id="countriesBar">
          <ul id="countriesList">
            {descriptionCountry.map((country, index) => (
              <li class='likeAA' key={index} onClick={() => selectCountry(index)}>{country.name}</li>
            ))}
          </ul>
        </div>
        <div id="descriptionPlace">
          <>
            {country !== null && (
              <>
                <h2>{descriptionCountry[country].name}</h2>
                {descriptionCountry[country].description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </>
            )}
          </>
        </div>
      </div>
  
      <div className='columnContainer'>
        <img src={harmonistereColumnTwo} alt="Second paysage vertical" className="universeColumnImg" />
      </div>
    </div>
  );
  
}

export default Univers;