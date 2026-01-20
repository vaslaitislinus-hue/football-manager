import React, { useState, useEffect } from 'react';

export default function FootballClubManager() {
  const [screen, setScreen] = useState('name'); // 'name', 'home', 'shop', 'packs', 'owned', 'casino', 'penalty', 'team', 'higherlower'
  const [showChances, setShowChances] = useState(false);
  const [packReveal, setPackReveal] = useState(null);
  const [shopFilter, setShopFilter] = useState('players'); // 'players' or 'coaches'
  const [penaltyState, setPenaltyState] = useState({
    betAmount: 0,
    customBet: '',
    direction: null,
    result: null,
    streak: 0,
    totalWinnings: 0
  });
  const [team, setTeam] = useState({
    gk: null,
    lb: null,
    cb1: null,
    cb2: null,
    rb: null,
    lm: null,
    cm1: null,
    cm2: null,
    rm: null,
    st1: null,
    st2: null,
    coach: null
  });
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [coaches, setCoaches] = useState({
    kompany: 0,
    guardiola: 0,
    slot: 0,
    alonso: 0,
    flick: 0
  });
  const [higherLowerState, setHigherLowerState] = useState({
    betAmount: 0,
    customBet: '',
    currentPlayer: null,
    nextPlayerHint: null,
    streak: 0,
    totalWinnings: 0,
    result: null
  });

  const casinoPlayers = [
    { name: 'Lamine Yamal', value: 200, position: 'Winger', team: 'FC Barcelona' },
    { name: 'Erling Haaland', value: 200, position: 'Striker', team: 'Manchester City' },
    { name: 'Kylian Mbappé', value: 200, position: 'Striker', team: 'Real Madrid' },
    { name: 'Jude Bellingham', value: 160, position: 'Midfielder', team: 'Real Madrid' },
    { name: 'Vinicius Junior', value: 150, position: 'Winger', team: 'Real Madrid' },
    { name: 'Pedri', value: 140, position: 'Midfielder', team: 'FC Barcelona' },
    { name: 'Jamal Musiala', value: 130, position: 'Midfielder', team: 'FC Bayern München' },
    { name: 'Michael Olise', value: 130, position: 'Winger', team: 'FC Bayern München' },
    { name: 'Bukayo Saka', value: 130, position: 'Winger', team: 'Arsenal FC' },
    { name: 'Cole Palmer', value: 120, position: 'Midfielder', team: 'Chelsea FC' },
    { name: 'Federico Valverde', value: 120, position: 'Midfielder', team: 'Real Madrid' },
    { name: 'Declan Rice', value: 120, position: 'Midfielder', team: 'Arsenal FC' },
    { name: 'Alexander Isak', value: 120, position: 'Striker', team: 'Newcastle United' },
    { name: 'Moisés Caicedo', value: 110, position: 'Midfielder', team: 'Chelsea FC' },
    { name: 'João Neves', value: 110, position: 'Midfielder', team: 'Benfica' },
    { name: 'Florian Wirtz', value: 110, position: 'Midfielder', team: 'Bayer Leverkusen' },
    { name: 'Vitinha', value: 110, position: 'Midfielder', team: 'Paris Saint-Germain' },
    { name: 'Julián Alvarez', value: 100, position: 'Striker', team: 'Atlético Madrid' },
    { name: 'Ousmane Dembélé', value: 100, position: 'Striker', team: 'Paris Saint-Germain' },
    { name: 'Désiré Doué', value: 90, position: 'Winger', team: 'Paris Saint-Germain' },
    { name: 'Arda Güler', value: 90, position: 'Midfielder', team: 'Real Madrid' },
    { name: 'Khvicha Kvaratskhelia', value: 90, position: 'Winger', team: 'SSC Napoli' },
    { name: 'William Saliba', value: 90, position: 'Defender', team: 'Arsenal FC' },
    { name: 'Ryan Gravenberch', value: 90, position: 'Midfielder', team: 'Liverpool FC' },
    { name: 'Hugo Ekitiké', value: 85, position: 'Striker', team: 'Eintracht Frankfurt' },
    { name: 'Matheus Cunha', value: 70, position: 'Striker', team: 'Wolverhampton Wanderers' },
    { name: 'Morgan Rogers', value: 70, position: 'Midfielder', team: 'Aston Villa' },
    { name: 'Luis Díaz', value: 70, position: 'Winger', team: 'Liverpool FC' },
    { name: 'Joško Gvardiol', value: 70, position: 'Defender', team: 'Manchester City' },
    { name: 'Nick Woltemade', value: 70, position: 'Striker', team: 'VfB Stuttgart' },
    { name: 'Cody Gakpo', value: 70, position: 'Winger', team: 'Liverpool FC' },
    { name: 'Jurriën Timber', value: 70, position: 'Defender', team: 'Arsenal FC' },
    { name: 'Rafael Leão', value: 70, position: 'Winger', team: 'AC Milan' },
    { name: 'Dayot Upamecano', value: 70, position: 'Defender', team: 'FC Bayern München' },
    { name: 'Viktor Gyökeres', value: 70, position: 'Striker', team: 'Sporting CP' },
    { name: 'Trent Alexander-Arnold', value: 70, position: 'Defender', team: 'Liverpool FC' },
    { name: 'Nico Paz', value: 65, position: 'Midfielder', team: 'Como 1907' },
    { name: 'Aleksandar Pavlović', value: 65, position: 'Midfielder', team: 'FC Bayern München' },
    { name: 'João Pedro', value: 65, position: 'Striker', team: 'Brighton & Hove Albion' },
    { name: 'Antoine Semenyo', value: 65, position: 'Winger', team: 'AFC Bournemouth' },
    { name: 'Micky van de Ven', value: 65, position: 'Defender', team: 'Tottenham Hotspur' },
    { name: 'Jérémy Doku', value: 65, position: 'Winger', team: 'Manchester City' },
    { name: 'Eberechi Eze', value: 65, position: 'Midfielder', team: 'Crystal Palace' },
    { name: 'Tijjani Reijnders', value: 65, position: 'Midfielder', team: 'AC Milan' },
    { name: 'Omar Marmoush', value: 65, position: 'Striker', team: 'Eintracht Frankfurt' },
    { name: 'Morgan Gibbs-White', value: 65, position: 'Midfielder', team: 'Nottingham Forest' },
    { name: 'Jules Koundé', value: 65, position: 'Defender', team: 'FC Barcelona' },
    { name: 'Harry Kane', value: 65, position: 'Striker', team: 'FC Bayern München' },
    { name: 'Lennart Karl', value: 60, position: 'Midfielder', team: 'FC Bayern München' },
    { name: 'Carlos Baleba', value: 60, position: 'Midfielder', team: 'Brighton & Hove Albion' }
  ];

  const coachData = {
    kompany: { name: 'Vincent Kompany', cost: 500, incomeBoost: 0.05 },
    guardiola: { name: 'Pep Guardiola', cost: 800, incomeBoost: 0.05 },
    slot: { name: 'Arne Slot', cost: 400, incomeBoost: 0.04 },
    alonso: { name: 'Xavi Alonso', cost: 300, incomeBoost: 0.03 },
    flick: { name: 'Hansi Flick', cost: 350, incomeBoost: 0.04 }
  };
  const [clubName, setClubName] = useState('');
  const [inputName, setInputName] = useState('');
  const [money, setMoney] = useState(10);
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);
  const [players, setPlayers] = useState({
    svensson: 0,
    araujo: 0,
    jorge: 0,
    gallagher: 0,
    dest: 0,
    toney: 0,
    mount: 0,
    alvarez: 0,
    leao: 0,
    neves: 0,
    wirtz: 0,
    vitinha: 0,
    dembele: 0,
    doue: 0,
    guler: 0,
    kvaratskhelia: 0,
    saliba: 0,
    gravenberch: 0,
    ekitike: 0,
    yamal: 0,
    haaland: 0,
    mbappe: 0,
    bellingham: 0,
    vinicius: 0,
    pedri: 0,
    musiala: 0,
    saka: 0,
    palmer: 0,
    valverde: 0,
    rice: 0,
    isak: 0,
    caicedo: 0,
    messi: 0,
    ronaldo: 0
  });
  const [rarityFilter, setRarityFilter] = useState('all');

  const playerData = {
    svensson: { name: 'Daniel Svensson', cost: 8, income: 0.06, rarity: 'common' },
    araujo: { name: 'Maxi Araujo', cost: 6, income: 0.04, rarity: 'common' },
    jorge: { name: 'Kaio Jorge', cost: 7, income: 0.05, rarity: 'common' },
    gallagher: { name: 'Conor Gallagher', cost: 12, income: 0.09, rarity: 'common' },
    dest: { name: 'Sergiño Dest', cost: 15, income: 0.12, rarity: 'common' },
    toney: { name: 'Ivan Toney', cost: 18, income: 0.14, rarity: 'common' },
    mount: { name: 'Mason Mount', cost: 80, income: 0.60, rarity: 'rare' },
    alvarez: { name: 'Julián Álvarez', cost: 95, income: 0.75, rarity: 'rare' },
    leao: { name: 'Rafael Leão', cost: 150, income: 1.10, rarity: 'rare' },
    neves: { name: 'João Neves', cost: 650, income: 4.5, rarity: 'epic' },
    wirtz: { name: 'Florian Wirtz', cost: 750, income: 5.2, rarity: 'epic' },
    vitinha: { name: 'Vitinha', cost: 700, income: 4.8, rarity: 'epic' },
    dembele: { name: 'Ousmane Dembélé', cost: 900, income: 6.2, rarity: 'epic' },
    doue: { name: 'Désiré Doué', cost: 850, income: 5.6, rarity: 'epic' },
    guler: { name: 'Arda Güler', cost: 800, income: 5.4, rarity: 'epic' },
    kvaratskhelia: { name: 'Khvicha Kvaratskhelia', cost: 950, income: 6.6, rarity: 'epic' },
    saliba: { name: 'William Saliba', cost: 1000, income: 7.2, rarity: 'epic' },
    gravenberch: { name: 'Ryan Gravenberch', cost: 820, income: 5.2, rarity: 'epic' },
    ekitike: { name: 'Hugo Ekitiké', cost: 780, income: 4.9, rarity: 'epic' },
    yamal: { name: 'Lamine Yamal', cost: 4500, income: 34, rarity: 'legendary' },
    haaland: { name: 'Erling Haaland', cost: 5500, income: 42, rarity: 'legendary' },
    mbappe: { name: 'Kylian Mbappé', cost: 6000, income: 46, rarity: 'legendary' },
    bellingham: { name: 'Jude Bellingham', cost: 4200, income: 31, rarity: 'legendary' },
    vinicius: { name: 'Vinícius Júnior', cost: 4800, income: 36, rarity: 'legendary' },
    pedri: { name: 'Pedri', cost: 3800, income: 29, rarity: 'legendary' },
    musiala: { name: 'Jamal Musiala', cost: 3900, income: 30, rarity: 'legendary' },
    saka: { name: 'Bukayo Saka', cost: 4000, income: 32, rarity: 'legendary' },
    palmer: { name: 'Cole Palmer', cost: 3600, income: 27, rarity: 'legendary' },
    valverde: { name: 'Federico Valverde', cost: 3700, income: 28, rarity: 'legendary' },
    rice: { name: 'Declan Rice', cost: 3500, income: 26, rarity: 'legendary' },
    isak: { name: 'Alexander Isak', cost: 3400, income: 25, rarity: 'legendary' },
    caicedo: { name: 'Moisés Caicedo', cost: 3200, income: 24, rarity: 'legendary' },
    messi: { name: 'Lionel Messi', cost: 15000, income: 120, rarity: 'og' },
    ronaldo: { name: 'Cristiano Ronaldo', cost: 15000, income: 120, rarity: 'og' }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const totalBoost = Object.entries(coaches).reduce((boost, [key, count]) => {
        if (count > 0) {
          return boost + coachData[key].incomeBoost;
        }
        return boost;
      }, 0);
      
      const boostedIncome = moneyPerSecond * (1 + totalBoost);
      setMoney(prev => prev + boostedIncome / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [moneyPerSecond, coaches]);

  const startGame = () => {
    if (inputName.trim()) {
      setClubName(inputName.trim());
      setScreen('home');
    }
  };

  const buyPlayer = (playerKey) => {
    const player = playerData[playerKey];
    if (money >= player.cost) {
      setMoney(prev => prev - player.cost);
      setPlayers(prev => ({ ...prev, [playerKey]: prev[playerKey] + 1 }));
      setMoneyPerSecond(prev => prev + player.income);
    }
  };

  const buyCoach = (coachKey) => {
    const coach = coachData[coachKey];
    if (coaches[coachKey] > 0) {
      alert('You already own this coach!');
      return;
    }
    if (money >= coach.cost) {
      setMoney(prev => prev - coach.cost);
      setCoaches(prev => ({ ...prev, [coachKey]: 1 }));
    }
  };

  const getTotalPlayers = () => {
    return Object.values(players).reduce((sum, count) => sum + count, 0);
  };

  const getFilteredPlayers = () => {
    if (rarityFilter === 'all') return Object.entries(playerData);
    return Object.entries(playerData).filter(([_, player]) => player.rarity === rarityFilter);
  };

  const openCommonPack = () => {
    if (money < 8) {
      alert('Not enough money! Common Pack costs $8');
      return;
    }
    
    setMoney(prev => prev - 8);
    
    const rand = Math.random() * 100;
    let selectedRarity;
    
    if (rand < 1) {
      selectedRarity = 'og';
    } else if (rand < 3) {
      selectedRarity = 'legendary';
    } else if (rand < 8) {
      selectedRarity = 'epic';
    } else if (rand < 28) {
      selectedRarity = 'rare';
    } else {
      selectedRarity = 'common';
    }
    
    const availablePlayers = Object.entries(playerData).filter(([_, player]) => player.rarity === selectedRarity);
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    const [playerKey, playerInfo] = randomPlayer;
    
    setPlayers(prev => ({ ...prev, [playerKey]: prev[playerKey] + 1 }));
    setMoneyPerSecond(prev => prev + playerInfo.income);
    
    setPackReveal({ name: playerInfo.name, rarity: playerInfo.rarity, income: playerInfo.income, cost: playerInfo.cost });
    
    setTimeout(() => {
      setPackReveal(null);
    }, 3000);
  };

  const openRarePack = () => {
    if (money < 60) {
      alert('Not enough money! Rare Pack costs $60');
      return;
    }
    
    setMoney(prev => prev - 60);
    
    const rand = Math.random() * 100;
    let selectedRarity;
    
    if (rand < 1) {
      selectedRarity = 'og';
    } else if (rand < 4) {
      selectedRarity = 'legendary';
    } else if (rand < 14) {
      selectedRarity = 'epic';
    } else if (rand < 54) {
      selectedRarity = 'rare';
    } else {
      selectedRarity = 'common';
    }
    
    const availablePlayers = Object.entries(playerData).filter(([_, player]) => player.rarity === selectedRarity);
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    const [playerKey, playerInfo] = randomPlayer;
    
    setPlayers(prev => ({ ...prev, [playerKey]: prev[playerKey] + 1 }));
    setMoneyPerSecond(prev => prev + playerInfo.income);
    
    setPackReveal({ name: playerInfo.name, rarity: playerInfo.rarity, income: playerInfo.income, cost: playerInfo.cost });
    
    setTimeout(() => {
      setPackReveal(null);
    }, 3000);
  };

  const openEpicPack = () => {
    if (money < 500) {
      alert('Not enough money! Epic Pack costs $500');
      return;
    }
    
    setMoney(prev => prev - 500);
    
    const rand = Math.random() * 100;
    let selectedRarity;
    
    if (rand < 2) {
      selectedRarity = 'og';
    } else if (rand < 9) {
      selectedRarity = 'legendary';
    } else if (rand < 38) {
      selectedRarity = 'epic';
    } else if (rand < 68) {
      selectedRarity = 'rare';
    } else {
      selectedRarity = 'common';
    }
    
    const availablePlayers = Object.entries(playerData).filter(([_, player]) => player.rarity === selectedRarity);
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    const [playerKey, playerInfo] = randomPlayer;
    
    setPlayers(prev => ({ ...prev, [playerKey]: prev[playerKey] + 1 }));
    setMoneyPerSecond(prev => prev + playerInfo.income);
    
    setPackReveal({ name: playerInfo.name, rarity: playerInfo.rarity, income: playerInfo.income, cost: playerInfo.cost });
    
    setTimeout(() => {
      setPackReveal(null);
    }, 3000);
  };

  const openLegendaryPack = () => {
    if (money < 3000) {
      alert('Not enough money! Legendary Pack costs $3000');
      return;
    }
    
    setMoney(prev => prev - 3000);
    
    const rand = Math.random() * 100;
    let selectedRarity;
    
    if (rand < 10) {
      selectedRarity = 'og';
    } else if (rand < 40) {
      selectedRarity = 'legendary';
    } else if (rand < 80) {
      selectedRarity = 'epic';
    } else if (rand < 90) {
      selectedRarity = 'rare';
    } else {
      selectedRarity = 'common';
    }
    
    const availablePlayers = Object.entries(playerData).filter(([_, player]) => player.rarity === selectedRarity);
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    const [playerKey, playerInfo] = randomPlayer;
    
    setPlayers(prev => ({ ...prev, [playerKey]: prev[playerKey] + 1 }));
    setMoneyPerSecond(prev => prev + playerInfo.income);
    
    setPackReveal({ name: playerInfo.name, rarity: playerInfo.rarity, income: playerInfo.income, cost: playerInfo.cost });
    
    setTimeout(() => {
      setPackReveal(null);
    }, 3000);
  };

  const shootPenalty = (direction) => {
    const keeperDirection = ['left', 'center', 'right'][Math.floor(Math.random() * 3)];
    const outcomeRoll = Math.random() * 100;
    
    let result, winnings, message;
    
    if (outcomeRoll < 50) {
      result = 'saved';
      winnings = 0;
      message = direction === keeperDirection 
        ? "Great save by the keeper!" 
        : "The keeper got lucky – saved!";
    } else if (outcomeRoll < 93) {
      result = 'goal';
      winnings = penaltyState.betAmount * 2;
      message = "Bottom corner – goal!";
    } else {
      result = 'perfect';
      winnings = penaltyState.betAmount * 5;
      message = "Top bins! Unstoppable strike!";
    }
    
    setPenaltyState(prev => ({
      ...prev,
      direction,
      result: {
        outcome: result,
        keeperDirection,
        message,
        winnings
      },
      streak: result === 'saved' ? 0 : prev.streak + 1,
      totalWinnings: result === 'saved' ? 0 : prev.totalWinnings + winnings
    }));
    
    if (result === 'saved') {
      setTimeout(() => {
        setPenaltyState({
          betAmount: 0,
          direction: null,
          result: null,
          streak: 0,
          totalWinnings: 0
        });
      }, 3000);
    }
  };

  const startPenalty = (bet) => {
    const betAmount = typeof bet === 'number' ? bet : parseFloat(bet);
    
    if (isNaN(betAmount) || betAmount < 1) {
      alert('Please enter a bet amount of at least $1');
      return;
    }
    
    if (money < betAmount) {
      alert('Not enough money!');
      return;
    }
    
    setMoney(prev => prev - betAmount);
    setPenaltyState({
      betAmount: betAmount,
      customBet: '',
      direction: null,
      result: null,
      streak: 0,
      totalWinnings: 0
    });
  };

  const collectWinnings = () => {
    setMoney(prev => prev + penaltyState.totalWinnings);
    setPenaltyState({
      betAmount: 0,
      direction: null,
      result: null,
      streak: 0,
      totalWinnings: 0
    });
  };

  const continueStreak = () => {
    setPenaltyState(prev => ({
      ...prev,
      direction: null,
      result: null
    }));
  };

  const handleDragStart = (playerKey) => {
    setDraggedPlayer(playerKey);
  };

  const handleDrop = (position) => {
    if (draggedPlayer) {
      setTeam(prev => ({
        ...prev,
        [position]: draggedPlayer
      }));
      setDraggedPlayer(null);
    }
  };

  const removeFromTeam = (position) => {
    setTeam(prev => ({
      ...prev,
      [position]: null
    }));
  };

  const getRandomCasinoPlayer = () => {
    return casinoPlayers[Math.floor(Math.random() * casinoPlayers.length)];
  };

  const startHigherLower = (bet) => {
    const betAmount = typeof bet === 'number' ? bet : parseFloat(bet);
    
    if (isNaN(betAmount) || betAmount < 1) {
      alert('Please enter a bet amount of at least $1');
      return;
    }
    
    if (money < betAmount) {
      alert('Not enough money!');
      return;
    }
    
    setMoney(prev => prev - betAmount);
    
    const currentPlayer = getRandomCasinoPlayer();
    const nextPlayer = getRandomCasinoPlayer();
    
    setHigherLowerState({
      betAmount: betAmount,
      customBet: '',
      currentPlayer: currentPlayer,
      nextPlayerHint: { position: nextPlayer.position, team: nextPlayer.team },
      nextPlayer: nextPlayer,
      streak: 0,
      totalWinnings: 0,
      result: null
    });
  };

  const guessHigherLower = (guess) => {
    const { currentPlayer, nextPlayer, betAmount, streak } = higherLowerState;
    
    const isCorrect = (guess === 'higher' && nextPlayer.value > currentPlayer.value) ||
                      (guess === 'lower' && nextPlayer.value < currentPlayer.value) ||
                      (guess === 'equal' && nextPlayer.value === currentPlayer.value);
    
    if (isCorrect) {
      const multipliers = [1.5, 2, 3, 5, 7, 10];
      const multiplier = multipliers[Math.min(streak, multipliers.length - 1)];
      const winnings = betAmount * multiplier;
      
      setHigherLowerState(prev => ({
        ...prev,
        result: { correct: true, nextPlayer },
        streak: prev.streak + 1,
        totalWinnings: winnings
      }));
    } else {
      setHigherLowerState(prev => ({
        ...prev,
        result: { correct: false, nextPlayer },
        streak: 0,
        totalWinnings: 0
      }));
      
      setTimeout(() => {
        setHigherLowerState({
          betAmount: 0,
          customBet: '',
          currentPlayer: null,
          nextPlayerHint: null,
          streak: 0,
          totalWinnings: 0,
          result: null
        });
      }, 3000);
    }
  };

  const continueHigherLower = () => {
    const newNextPlayer = getRandomCasinoPlayer();
    
    setHigherLowerState(prev => ({
      ...prev,
      currentPlayer: prev.nextPlayer,
      nextPlayerHint: { position: newNextPlayer.position, team: newNextPlayer.team },
      nextPlayer: newNextPlayer,
      result: null
    }));
  };

  const collectHigherLowerWinnings = () => {
    setMoney(prev => prev + higherLowerState.totalWinnings);
    setHigherLowerState({
      betAmount: 0,
      customBet: '',
      currentPlayer: null,
      nextPlayerHint: null,
      streak: 0,
      totalWinnings: 0,
      result: null
    });
  };

  if (screen === 'name') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Create Your Football Club</h1>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter club name"
            style={{ 
              padding: '10px', 
              fontSize: '16px',
              marginBottom: '20px',
              width: '250px'
            }}
            onKeyPress={(e) => e.key === 'Enter' && startGame()}
          />
          <br />
          <button 
            onClick={startGame}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'home') {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>{clubName}</h1>
        
        <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid black' }}>
          <h2>Money: ${money.toFixed(2)}</h2>
          <p>Income: ${moneyPerSecond.toFixed(2)}/second</p>
          <p>Players: {getTotalPlayers()}</p>
        </div>

        <button 
          onClick={() => setScreen('shop')}
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Shop
        </button>

        <button 
          onClick={() => setScreen('packs')}
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Packs
        </button>

        <button 
          onClick={() => setScreen('owned')}
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Owned Players
        </button>

        <button 
          onClick={() => setScreen('casino')}
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Casino
        </button>

        <button 
          onClick={() => setScreen('team')}
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Build Team
        </button>
      </div>
    );
  }

  if (screen === 'shop') {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button 
          onClick={() => setScreen('home')}
          style={{ 
            padding: '5px 15px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>

        <h1>Shop</h1>

        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setShopFilter('players')}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px',
              backgroundColor: shopFilter === 'players' ? '#4CAF50' : 'white',
              color: shopFilter === 'players' ? 'white' : 'black',
              border: '2px solid #4CAF50'
            }}
          >
            Players
          </button>
          <button 
            onClick={() => setShopFilter('coaches')}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: shopFilter === 'coaches' ? '#f39c12' : 'white',
              color: shopFilter === 'coaches' ? 'white' : 'black',
              border: '2px solid #f39c12'
            }}
          >
            Coaches
          </button>
        </div>

        {shopFilter === 'players' && (
          <div>
            <h2>Players</h2>
            <div style={{ marginBottom: '20px' }}>
              <label>Filter by Rarity: </label>
              <select 
                value={rarityFilter} 
                onChange={(e) => setRarityFilter(e.target.value)}
                style={{ padding: '5px', marginLeft: '10px' }}
              >
                <option value="all">All</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
                <option value="og">OG (Best)</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid black' }}>
              <p>Your Money: ${money.toFixed(2)}</p>
            </div>

            {getFilteredPlayers().map(([key, player]) => (
              <div key={key} style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                border: '1px solid black',
                backgroundColor: money >= player.cost ? 'white' : '#f0f0f0'
              }}>
                <div style={{ marginBottom: '5px' }}>
                  <strong>{player.name}</strong> <span style={{ fontSize: '12px', color: '#666' }}>({player.rarity})</span>
                </div>
                <div>Cost: ${player.cost} | Income: ${player.income}/sec</div>
                <div>Owned: {players[key]}</div>
                <button 
                  onClick={() => buyPlayer(key)}
                  disabled={money < player.cost}
                  style={{ 
                    marginTop: '5px',
                    padding: '5px 10px',
                    cursor: money >= player.cost ? 'pointer' : 'not-allowed'
                  }}
                >
                  Buy
                </button>
              </div>
            ))}

            {getFilteredPlayers().length === 0 && (
              <p>No players available in this rarity.</p>
            )}
          </div>
        )}

        {shopFilter === 'coaches' && (
          <div>
            <h2>Coaches</h2>
            <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>Coaches provide permanent income bonuses!</p>

            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid black' }}>
              <p>Your Money: ${money.toFixed(2)}</p>
            </div>

            {Object.entries(coachData).map(([key, coach]) => (
              <div key={key} style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                border: '2px solid #f39c12',
                backgroundColor: coaches[key] > 0 ? '#d4edda' : (money >= coach.cost ? 'white' : '#f0f0f0')
              }}>
                <div style={{ marginBottom: '5px' }}>
                  <strong>{coach.name}</strong>
                </div>
                <div>Cost: ${coach.cost} | Boost: +{(coach.incomeBoost * 100).toFixed(0)}% income</div>
                <div>{coaches[key] > 0 ? '✓ Owned' : 'Not Owned'}</div>
                <button 
                  onClick={() => buyCoach(key)}
                  disabled={money < coach.cost || coaches[key] > 0}
                  style={{ 
                    marginTop: '5px',
                    padding: '5px 10px',
                    cursor: (money >= coach.cost && coaches[key] === 0) ? 'pointer' : 'not-allowed'
                  }}
                >
                  {coaches[key] > 0 ? 'Owned' : 'Buy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (screen === 'packs') {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button 
          onClick={() => setScreen('home')}
          style={{ 
            padding: '5px 15px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>

        <h1>Packs</h1>

        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid black' }}>
          <h2>Common Pack - $8</h2>
          <button 
            onClick={() => setShowChances(!showChances)}
            style={{ 
              padding: '5px 10px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            {showChances ? 'Hide Chances' : 'Show Chances'}
          </button>
          {showChances && (
            <div style={{ marginBottom: '10px' }}>
              <p>Chances:</p>
              <ul>
                <li>50% Common</li>
                <li>20% Rare</li>
                <li>5% Epic</li>
                <li>2% Legendary</li>
                <li>1% OG</li>
              </ul>
            </div>
          )}
          <button 
            onClick={openCommonPack}
            disabled={money < 8}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: money >= 8 ? 'pointer' : 'not-allowed',
              backgroundColor: money >= 8 ? 'white' : '#f0f0f0'
            }}
          >
            Open Common Pack
          </button>
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #3498db' }}>
          <h2>Rare Pack - $60</h2>
          <button 
            onClick={() => setShowChances(!showChances)}
            style={{ 
              padding: '5px 10px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            {showChances ? 'Hide Chances' : 'Show Chances'}
          </button>
          {showChances && (
            <div style={{ marginBottom: '10px' }}>
              <p>Chances:</p>
              <ul>
                <li>45% Common</li>
                <li>40% Rare</li>
                <li>10% Epic</li>
                <li>3% Legendary</li>
                <li>1% OG</li>
              </ul>
            </div>
          )}
          <button 
            onClick={openRarePack}
            disabled={money < 60}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: money >= 60 ? 'pointer' : 'not-allowed',
              backgroundColor: money >= 60 ? 'white' : '#f0f0f0'
            }}
          >
            Open Rare Pack
          </button>
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #9b59b6' }}>
          <h2>Epic Pack - $500</h2>
          <button 
            onClick={() => setShowChances(!showChances)}
            style={{ 
              padding: '5px 10px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            {showChances ? 'Hide Chances' : 'Show Chances'}
          </button>
          {showChances && (
            <div style={{ marginBottom: '10px' }}>
              <p>Chances:</p>
              <ul>
                <li>30% Common</li>
                <li>30% Rare</li>
                <li>29% Epic</li>
                <li>7% Legendary</li>
                <li>2% OG</li>
              </ul>
            </div>
          )}
          <button 
            onClick={openEpicPack}
            disabled={money < 500}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: money >= 500 ? 'pointer' : 'not-allowed',
              backgroundColor: money >= 500 ? 'white' : '#f0f0f0'
            }}
          >
            Open Epic Pack
          </button>
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #f39c12' }}>
          <h2>Legendary Pack - $3000</h2>
          <button 
            onClick={() => setShowChances(!showChances)}
            style={{ 
              padding: '5px 10px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            {showChances ? 'Hide Chances' : 'Show Chances'}
          </button>
          {showChances && (
            <div style={{ marginBottom: '10px' }}>
              <p>Chances:</p>
              <ul>
                <li>20% Common</li>
                <li>10% Rare</li>
                <li>40% Epic</li>
                <li>30% Legendary</li>
                <li>10% OG</li>
              </ul>
            </div>
          )}
          <button 
            onClick={openLegendaryPack}
            disabled={money < 3000}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: money >= 3000 ? 'pointer' : 'not-allowed',
              backgroundColor: money >= 3000 ? 'white' : '#f0f0f0'
            }}
          >
            Open Legendary Pack
          </button>
        </div>

        {packReveal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              animation: 'reveal 1.5s ease-out forwards'
            }}>
              <style>{`
                @keyframes reveal {
                  0% {
                    transform: scale(0.3);
                    filter: blur(20px);
                    opacity: 0;
                  }
                  100% {
                    transform: scale(1);
                    filter: blur(0);
                    opacity: 1;
                  }
                }
              `}</style>
              <div>{packReveal.name}</div>
              <div style={{ fontSize: '30px', marginTop: '10px', textTransform: 'uppercase' }}>
                {packReveal.rarity}
              </div>
              <div style={{ fontSize: '20px', marginTop: '15px' }}>
                Cost: ${packReveal.cost} | Income: ${packReveal.income}/sec
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (screen === 'owned') {
    const ownedPlayers = Object.entries(players)
      .filter(([_, count]) => count > 0)
      .map(([key, count]) => ({ key, count, ...playerData[key] }));

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button 
          onClick={() => setScreen('home')}
          style={{ 
            padding: '5px 15px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>

        <h1>Owned Players</h1>

        {ownedPlayers.length === 0 ? (
          <p>You don't own any players yet.</p>
        ) : (
          ownedPlayers.map(player => (
            <div key={player.key} style={{ 
              marginBottom: '15px', 
              padding: '10px', 
              border: '1px solid black'
            }}>
              <div style={{ marginBottom: '5px' }}>
                <strong>{player.name}</strong> <span style={{ fontSize: '12px', color: '#666' }}>({player.rarity})</span>
              </div>
              <div>Income: ${player.income}/sec | Owned: {player.count}</div>
            </div>
          ))
        )}
      </div>
    );
  }

  if (screen === 'casino') {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button 
          onClick={() => setScreen('home')}
          style={{ 
            padding: '5px 15px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>

        <h1>Casino</h1>

        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid black' }}>
          <h2>Penalty Shootout</h2>
          <p>Choose your direction and score!</p>
          <button 
            onClick={() => setScreen('penalty')}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Play Penalty Shootout
          </button>
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid black' }}>
          <h2>Higher or Lower</h2>
          <p>Guess if the next player has higher or lower market value!</p>
          <button 
            onClick={() => setScreen('higherlower')}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Play Higher or Lower
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'penalty') {
    if (penaltyState.betAmount === 0) {
      return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <button 
            onClick={() => setScreen('casino')}
            style={{ 
              padding: '5px 15px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            Back
          </button>

          <h1>Penalty Shootout</h1>
          <p>Your Money: ${money.toFixed(2)}</p>

          <h3>Choose Your Bet:</h3>
          {[10, 25, 50, 100].map(bet => (
            <button 
              key={bet}
              onClick={() => startPenalty(bet)}
              disabled={money < bet}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: money >= bet ? 'pointer' : 'not-allowed',
                marginRight: '10px',
                marginBottom: '10px'
              }}
            >
              ${bet}
            </button>
          ))}

          <div style={{ marginTop: '20px' }}>
            <h3>Or Enter Custom Amount:</h3>
            <input
              type="number"
              min="1"
              step="0.01"
              value={penaltyState.customBet}
              onChange={(e) => setPenaltyState(prev => ({ ...prev, customBet: e.target.value }))}
              placeholder="Enter amount"
              style={{ 
                padding: '10px',
                fontSize: '16px',
                width: '150px',
                marginRight: '10px'
              }}
            />
            <button 
              onClick={() => startPenalty(penaltyState.customBet)}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Bet Custom Amount
            </button>
          </div>

          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
            <h4>Rules:</h4>
            <ul>
              <li>Saved: Lose your bet (50% chance)</li>
              <li>Goal: Win 2× your bet (43% chance)</li>
              <li>Perfect Shot: Win 5× your bet (7% chance)</li>
            </ul>
            <p>Continue your streak to multiply winnings, but if you miss, you lose everything!</p>
          </div>
        </div>
      );
    }

    if (!penaltyState.result) {
      return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <h1>Penalty Shootout</h1>
          <p>Bet: ${penaltyState.betAmount}</p>
          {penaltyState.streak > 0 && (
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Streak: {penaltyState.streak} | Winnings: ${penaltyState.totalWinnings.toFixed(2)}
            </p>
          )}

          <h3>Choose Your Direction:</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              onClick={() => shootPenalty('left')}
              style={{ 
                padding: '20px 30px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              Left
            </button>
            <button 
              onClick={() => shootPenalty('center')}
              style={{ 
                padding: '20px 30px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              Center
            </button>
            <button 
              onClick={() => shootPenalty('right')}
              style={{ 
                padding: '20px 30px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              Right
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Penalty Shootout</h1>
        
        <div style={{ padding: '20px', border: '2px solid black', marginBottom: '20px' }}>
          <p>You shot: <strong>{penaltyState.direction}</strong></p>
          <p>Keeper dived: <strong>{penaltyState.result.keeperDirection}</strong></p>
          <h2 style={{ marginTop: '20px' }}>{penaltyState.result.message}</h2>
          {penaltyState.result.outcome !== 'saved' && (
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
              +${penaltyState.result.winnings.toFixed(2)}
            </p>
          )}
        </div>

        {penaltyState.result.outcome === 'saved' ? (
          <button 
            onClick={() => {
              setPenaltyState({
                betAmount: 0,
                direction: null,
                result: null,
                streak: 0,
                totalWinnings: 0
              });
              setScreen('penalty');
            }}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        ) : (
          <div>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              Current Winnings: ${penaltyState.totalWinnings.toFixed(2)}
            </p>
            <button 
              onClick={collectWinnings}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Collect Winnings
            </button>
            <button 
              onClick={continueStreak}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Continue Streak
            </button>
          </div>
        )}
      </div>
    );
  }

  if (screen === 'team') {
    const teamPlayers = Object.values(team).filter(p => p !== null && p !== team.coach);
    const ownedPlayers = Object.entries(players)
      .filter(([_, count]) => count > 0)
      .map(([key, count]) => ({ key, count, ...playerData[key] }))
      .filter(player => !teamPlayers.includes(player.key));

    const ownedCoaches = Object.entries(coaches)
      .filter(([_, count]) => count > 0)
      .map(([key]) => ({ key, ...coachData[key] }))
      .filter(coach => team.coach !== coach.key);

    const calculateTeamValue = () => {
      let totalValue = 0;
      Object.entries(team).forEach(([position, playerKey]) => {
        if (playerKey && position !== 'coach' && playerData[playerKey]) {
          totalValue += playerData[playerKey].cost;
        }
      });
      return totalValue;
    };

    const teamValue = calculateTeamValue();
    const positionsCount = Object.entries(team).filter(([pos, player]) => pos !== 'coach' && player !== null).length;

    const positions = [
      { id: 'st1', label: 'ST', top: '10%', left: '35%' },
      { id: 'st2', label: 'ST', top: '10%', left: '55%' },
      { id: 'lm', label: 'LM', top: '35%', left: '10%' },
      { id: 'cm1', label: 'CM', top: '35%', left: '35%' },
      { id: 'cm2', label: 'CM', top: '35%', left: '55%' },
      { id: 'rm', label: 'RM', top: '35%', left: '80%' },
      { id: 'lb', label: 'LB', top: '60%', left: '10%' },
      { id: 'cb1', label: 'CB', top: '60%', left: '35%' },
      { id: 'cb2', label: 'CB', top: '60%', left: '55%' },
      { id: 'rb', label: 'RB', top: '60%', left: '80%' },
      { id: 'gk', label: 'GK', top: '85%', left: '45%' }
    ];

    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setScreen('home')}
          style={{ 
            padding: '5px 15px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>

        <h1>Build Your Team (4-4-2)</h1>

        <div style={{ marginBottom: '20px', padding: '15px', border: '3px solid #4CAF50', backgroundColor: '#e8f5e9' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Team Overview</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '18px' }}>
            <div>
              <strong>Players:</strong> {positionsCount}/11
            </div>
            <div>
              <strong>Team Value:</strong> ${teamValue.toFixed(2)}
            </div>
            <div>
              <strong>Coach:</strong> {team.coach ? coachData[team.coach].name : 'None'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            position: 'relative',
            width: '70%',
            height: '500px',
            backgroundColor: '#2d5016',
            border: '2px solid white'
          }}>
            {positions.map(pos => (
              <div
                key={pos.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(pos.id)}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  border: '2px solid white',
                  backgroundColor: team[pos.id] ? '#fff' : 'rgba(255,255,255,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '10px',
                  textAlign: 'center',
                  padding: '5px'
                }}
                onClick={() => team[pos.id] && removeFromTeam(pos.id)}
              >
                {team[pos.id] ? (
                  <>
                    <strong>{playerData[team[pos.id]].name}</strong>
                    <small>${playerData[team[pos.id]].cost}</small>
                  </>
                ) : (
                  <strong>{pos.label}</strong>
                )}
              </div>
            ))}
          </div>

          <div style={{ 
            width: '30%',
            padding: '15px',
            border: '2px solid #f39c12',
            backgroundColor: '#fff8e1',
            height: 'fit-content'
          }}>
            <h3 style={{ marginTop: 0 }}>Coach</h3>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('coach')}
              style={{
                minHeight: '100px',
                padding: '10px',
                border: '2px dashed #f39c12',
                backgroundColor: team.coach ? '#fff' : 'rgba(243, 156, 18, 0.1)',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => team.coach && removeFromTeam('coach')}
            >
              {team.coach ? (
                <>
                  <strong>{coachData[team.coach].name}</strong>
                  <div style={{ fontSize: '12px', marginTop: '5px' }}>
                    +{(coachData[team.coach].incomeBoost * 100).toFixed(0)}% Income
                  </div>
                </>
              ) : (
                <div style={{ color: '#999' }}>Drag coach here</div>
              )}
            </div>
          </div>
        </div>

        <h3>Your Players (Drag to Position)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
          {ownedPlayers.map(player => (
            <div
              key={player.key}
              draggable
              onDragStart={() => handleDragStart(player.key)}
              style={{
                padding: '10px',
                border: '1px solid black',
                backgroundColor: 'white',
                cursor: 'grab',
                minWidth: '120px'
              }}
            >
              <strong>{player.name}</strong>
              <div style={{ fontSize: '12px' }}>Cost: ${player.cost}</div>
              <div style={{ fontSize: '12px' }}>Owned: {player.count}</div>
            </div>
          ))}
        </div>

        {ownedPlayers.length === 0 && (
          <p>You don't have any players yet. Buy some packs or players first!</p>
        )}

        <h3>Your Coaches (Drag to Coach Slot)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {ownedCoaches.map(coach => (
            <div
              key={coach.key}
              draggable
              onDragStart={() => handleDragStart(coach.key)}
              style={{
                padding: '10px',
                border: '2px solid #f39c12',
                backgroundColor: 'white',
                cursor: 'grab',
                minWidth: '120px'
              }}
            >
              <strong>{coach.name}</strong>
              <div style={{ fontSize: '12px' }}>+{(coach.incomeBoost * 100).toFixed(0)}% Income</div>
            </div>
          ))}
        </div>

        {ownedCoaches.length === 0 && (
          <p>You don't have any coaches yet. Buy some from the shop!</p>
        )}
      </div>
    );
  }

  if (screen === 'higherlower') {
    if (higherLowerState.betAmount === 0) {
      return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <button 
            onClick={() => setScreen('casino')}
            style={{ 
              padding: '5px 15px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            Back
          </button>

          <h1>Higher or Lower</h1>
          <p>Your Money: ${money.toFixed(2)}</p>

          <h3>Choose Your Bet:</h3>
          {[10, 25, 50, 100].map(bet => (
            <button 
              key={bet}
              onClick={() => startHigherLower(bet)}
              disabled={money < bet}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: money >= bet ? 'pointer' : 'not-allowed',
                marginRight: '10px',
                marginBottom: '10px'
              }}
            >
              ${bet}
            </button>
          ))}

          <div style={{ marginTop: '20px' }}>
            <h3>Or Enter Custom Amount:</h3>
            <input
              type="number"
              min="1"
              step="0.01"
              value={higherLowerState.customBet}
              onChange={(e) => setHigherLowerState(prev => ({ ...prev, customBet: e.target.value }))}
              placeholder="Enter amount"
              style={{ 
                padding: '10px',
                fontSize: '16px',
                width: '150px',
                marginRight: '10px'
              }}
            />
            <button 
              onClick={() => startHigherLower(higherLowerState.customBet)}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Bet Custom Amount
            </button>
          </div>

          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
            <h4>Rules:</h4>
            <ul>
              <li>Guess if the next player has HIGHER, SAME, or LOWER market value</li>
              <li>You'll see hints: Position & Team of next player</li>
              <li>Streak multipliers: 1.5× → 2× → 3× → 5× → 7× → 10×</li>
              <li>Wrong guess = lose everything!</li>
            </ul>
          </div>
        </div>
      );
    }

    if (!higherLowerState.result) {
      return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <h1>Higher or Lower</h1>
          <p>Bet: ${higherLowerState.betAmount}</p>
          {higherLowerState.streak > 0 && (
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Streak: {higherLowerState.streak} | Winnings: ${higherLowerState.totalWinnings.toFixed(2)}
            </p>
          )}

          <div style={{ padding: '20px', border: '3px solid black', marginBottom: '20px', backgroundColor: '#f0f0f0' }}>
            <h2>{higherLowerState.currentPlayer.name}</h2>
            <p style={{ fontSize: '32px', fontWeight: 'bold' }}>€{higherLowerState.currentPlayer.value}M</p>
            <p>{higherLowerState.currentPlayer.position} | {higherLowerState.currentPlayer.team}</p>
          </div>

          <div style={{ padding: '15px', border: '2px solid orange', marginBottom: '20px', backgroundColor: '#fff8e1' }}>
            <h3>Next Player Hint:</h3>
            <p><strong>Position:</strong> {higherLowerState.nextPlayerHint.position}</p>
            <p><strong>Team:</strong> {higherLowerState.nextPlayerHint.team}</p>
          </div>

          <h3>Will the next player's value be:</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
            <button 
              onClick={() => guessHigherLower('higher')}
              style={{ 
                padding: '20px 40px',
                fontSize: '20px',
                cursor: 'pointer',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none'
              }}
            >
              HIGHER
            </button>
            <button 
              onClick={() => guessHigherLower('equal')}
              style={{ 
                padding: '20px 40px',
                fontSize: '20px',
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none'
              }}
            >
              SAME
            </button>
            <button 
              onClick={() => guessHigherLower('lower')}
              style={{ 
                padding: '20px 40px',
                fontSize: '20px',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none'
              }}
            >
              LOWER
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Higher or Lower</h1>
        
        <div style={{ padding: '20px', border: '3px solid black', marginBottom: '20px', backgroundColor: higherLowerState.result.correct ? '#c8e6c9' : '#ffcdd2' }}>
          <h2>{higherLowerState.result.correct ? '✓ CORRECT!' : '✗ WRONG!'}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{higherLowerState.result.nextPlayer.name}</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>€{higherLowerState.result.nextPlayer.value}M</p>
          <p>{higherLowerState.result.nextPlayer.position} | {higherLowerState.result.nextPlayer.team}</p>
        </div>

        {higherLowerState.result.correct ? (
          <div>
            <p style={{ fontSize: '20px', marginBottom: '10px' }}>
              Streak: {higherLowerState.streak} | Winnings: ${higherLowerState.totalWinnings.toFixed(2)}
            </p>
            <button 
              onClick={collectHigherLowerWinnings}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Collect Winnings
            </button>
            <button 
              onClick={continueHigherLower}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Continue Streak
            </button>
          </div>
        ) : (
          <button 
            onClick={() => {
              setHigherLowerState({
                betAmount: 0,
                customBet: '',
                currentPlayer: null,
                nextPlayerHint: null,
                streak: 0,
                totalWinnings: 0,
                result: null
              });
              setScreen('higherlower');
            }}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }
}