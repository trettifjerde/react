const _questions = [
    {
      question: 'Вечер пятницы. Вы решаете, как проведёте завтрашний день:',
      options: [
        'Предпочтете велопрогулку по ночному городу',
        'Захотите проучить своих недоброжелателей',
        'Закатите вечеринку',
        'Решите выпить пива в баре и спеть песню'
      ]
    },
    {
      question: 'На обед вы скорее всего приготовите:',
      options: [
        'Свежее, сочное мясо',
        'Экзотическое блюдо',
        'Лесные грибцы',
        'Искусительные булочки'
      ]
    },
    {
      question: 'До начала рабочего дня осталось 10 минут, а вы ещё дома, чем воспользуетесь:',
      options: [
        'Порталом',
        'Воздушным транспортом', 
        'Своими ногами', 
        'Метлой'
      ]
    },
    {
      question: 'Больше всего на свете вам не нравится:',
      options: [
        'Когда берут ваши вещи без спроса',
        'Когда вас не воспринимают всерьез', 
        'Когда вам не рады', 
        'Когда вам не доверяют'
      ]
    },
    {
      question: 'На вас бежит дикий кабан, чем будете отбиваться:',
      options: [
        'Холодным оружием',
        'Силой мысли', 
        'Подручными предметами', 
        'Смекалкой'
      ]
    },
    {
      question: 'Вас пригласили на званый ужин. Вы открываете свой шкаф и видите там костюм, как будет называться ваш образ:',
      options: [
        'Аппетитный жмурик',
        'Мягкий шик', 
        'Дед на выданье',
        'Приличная искусительница'
      ]
    }
];

const pollResults = [
  {
    id: 0,
    character: 'Лепрекон',
    phrase: '"Отдай мне мою монету, а то сделаю из тебя котлету"',
    description: 'Вы - Лепрекон. Красавец мужчина, сердцеед, и просто хороший финансист. У вас всегда найдется причина залезть на свой трёхколёсный велик и предаться цели, умеете добиваться своего любой ценой, а цену вы уж точно знаете. ',
    imagePath: 'https://i.imgur.com/mjWmzqH.jpg'
  },
  {
    id: 1,
    character: 'малыш Грогу',
    phrase: '"Ъуьуьуь"',
    description: 'Вы - малыш Грогу. Мамкин бродяга, папкин симпатяга, звер в душе. У вас непревзойденный талант убеждения, вы мастер сна, а также вы умеете сохранять спокойствие в трудных ситуациях, но если вас разозлить..лучше вас не злить.',
    imagePath: 'https://i.imgur.com/QLVPdjo.jpg'
  },
  {
    id: 2,
    character: 'Хоббит',
    phrase: '"У нас в Шире говорят: не видом пригож, а делом хорош"',
    description: 'Вы - Хоббитц. Ниндзя леса, душа компании и превосходный дегустатор. У вас в карманцах водятся первоклассные каштаны, а в животе всегда найдется место для трапезы. Шумные вечеринки и отшельничество воссоздают гармонию и покой в вашей душе.',
    imagePath: 'https://i.imgur.com/LlGd1Ro.jpg'
  },
  {
    id: 3,
    character: 'Гита Ягг',
    phrase: '"Гутен день, майне добрый хер! Труа пивас фюр нас, мерси в боку"',
    description: 'Вы - Гита Ягг. Мудрая, обворожительная женщина с лицом, как печеное яблочко, шальная императрица и просто веселая пенсионерка. У вас есть кот Грибо, немного наличных в трусах, а так же вы автор прекрасной, неприличной песенки "про ёжика".',
    imagePath: 'https://i.imgur.com/qQS4k4S.jpg'
  },
];

const QUESTIONS = _questions.map((q, i) => {
  const {question, options} = q;
  return {
    question: question,
    id: i,
    options: options.map((option, i) => {return {text: option, id: i}})
  }
});

const calculateResult = (selectedOptions) => {
  const results = selectedOptions.reduce((acc, option) => {
    const key = option.toString();
    if (! (key in acc)) 
    {
      acc[key] = 0;
    }
    acc[key] = acc[key] + 1;
    return acc;
  }, {});

  const res = {isComplete: null, result: null};
  const maxCount = Math.max(...Object.values(results));
  const gotMax = Object.keys(results).filter(k => results[k] === maxCount);

  if (gotMax.length > 1) {
    res.isComplete = false;
    res.result = gotMax.map(k => +k);
  }
  else {
    res.isComplete = true;
    res.result = +gotMax[0];
  }
  
  return res;
};

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const el = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = el;
  }
  return shuffled;
}

function getShuffledQuestions(nOfQuestions=5) {
  const maxQLength = Math.min(QUESTIONS.length, nOfQuestions + 1);
  const shuffledQuestions = shuffleArray(QUESTIONS).slice(0, maxQLength);

  const shuffledQuestionsWithShuffledOptions = shuffledQuestions.map(q => {
    const {options} = q;
    return {...q, options: shuffleArray(options)} 
  });

  return shuffledQuestionsWithShuffledOptions;
};

function prepareLastQuestion(questions, optIds) {
  const {question, id, options} = questions[questions.length - 1];
  const customizedLastQuestion = {question: question, id: id, options: options.filter(o => optIds.includes(o.id))};
  return customizedLastQuestion;
}

function getResult(i) {
  return {...pollResults[i]};
}

export {calculateResult, getShuffledQuestions, prepareLastQuestion, getResult};