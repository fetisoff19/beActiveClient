import {
  convertDistance,
  convertPace,
  convertPaceInMinute,
  convertSpeed,
  getHourMinSec
} from "../API/functionsDate&Values";
import variables from '../components/DashboardContent/styles.module.scss'


// export const API_URL = `http://localhost:80/`
export const API_URL = `https://beactive-fetisoff19.amvera.io/`
export let userLang = 'ru';
export const changeLanguage = l => l ? userLang = l : null;
export const demoUser = ['demo@sports-app.com', 'demonstration']

export const dict = {
  fields: {
    date: {ru: 'Дата', en: 'Date'},
    timestamp: {ru: 'Окончание занятия', en: 'Workout end'},
    startTime: {ru: 'Начало занятия', en: 'Date'},
    totalElapsedTime: {ru: 'Продолжительность', en: 'Duration'},
    totalTimerTime: {ru: 'Время в движении', en: 'Moving time'},
    totalDistance: {ru: 'Расстояние', en: 'Distance'},
    totalStrides: {ru: 'Кол-во шагов', en: 'Strides'},
    totalCalories: {ru: 'Калорий потрачено', en: 'Calories'},
    speed: {ru: 'Скорость', en: 'Speed'},
    avgSpeed: {ru: 'Средняя скорость', en: 'Average speed'},
    maxSpeed: {ru: 'Макс. скорость', en: 'Maximum speed'},
    minAltitude: {ru: 'Мин. высота', en: 'Minimum altitude'},
    altitude: {ru: 'Высота', en: 'Altitude'},
    avgAltitude: {ru: 'Средняя высота', en: 'Average altitude'},
    maxAltitude: {ru: 'Макс. высота', en: 'Maximum altitude'},
    avgGrade: {ru: 'Средний градиент', en: 'Average grade'},
    maxPosGrade: {ru: 'Макс. градиент', en: 'Maximum grade'},
    totalAscent: {ru: 'Набор высоты', en: 'Ascend'},
    totalDescent: {ru: 'Спуск', en: 'Descend'},
    sport: {ru: 'Вид занятия', en: 'Sport'},
    power: {ru: 'Мощность', en: 'Power'},
    avgPower: {ru: 'Средняя мощность', en: 'Average power'},
    maxPower: {ru: 'Макс. мощность', en: 'Maximum power'},
    normalizedPower:  {ru: 'Нормализованная мощность', en: 'Normalized power',},
    powerCurve: {ru: 'Кривая мощности', en: 'Power curve'},
    heartRate: {ru: 'Пульс', en: 'Heart rate'},
    minHeartRate: {ru: 'Мин. пульс', en: 'Minimum HR'},
    avgHeartRate: {ru: 'Средний пульс', en: 'Average HR'},
    maxHeartRate: {ru: 'Макс. пульс', en: 'Maximum HR'},
    cadence: {ru: 'Каденс', en: 'Cadence'},
    cadenceRun: {ru: 'Каденс', en: 'Cadence'},
    avgCadence: {ru: 'Средний каденс', en: 'Average cadence'},
    maxCadence: {ru: 'Макс. каденс', en: 'Average cadence'},
    avgRunningCadence: {ru: 'Средний каденс', en: 'Average cadence'},
    maxRunningCadence: {ru: 'Макс. каденс', en: 'Maximum cadence'},
    pace: {ru: 'Темп', en: 'Pace',},
    avgPace: {ru: 'Средний темп', en: 'Average pace',},
    enhancedMaxSpeed: {ru: 'Макс. темп', en: 'Maximum pace',},
    enhancedAvgSpeed: {ru: 'Средний темп', en: 'Average pace',},
    time: {ru: 'Время', en: 'Time',},
    trainingStressScore: {ru: 'TSS®', en: 'TSS®',},
    leftRightBalance: {ru: 'Баланс', en: 'Balance',},
    maxTemperature: {ru: 'Макс. температура', en: 'Maximum temperature',},
    avgTemperature: {ru: 'Средняя температура', en: 'Average temperature',},
    temperature: {ru: 'Температура', en: 'Temperature',},
    other: {ru: 'Другое', en: 'Other',},
    totalWorkouts: {ru: 'Всего активностей', en: 'Total workouts',}
  },

  units: {
    seconds: {ru: 'Секунды', en: 'Seconds'},
    s: {ru: 'с', en: 's'},
    min: {ru: 'мин.', en: 'min.'},
    m: {ru: 'м', en: 'm'},
    km: {ru: 'км', en: 'km'},
    mps: {ru: 'Метры в секунду', en: 'Meters per second'},
    kmph: {ru: 'км/ч', en: 'km/h'},
    bpm: {ru: 'уд/мин', en: 'bpm'},
    w: {ru: 'Вт', en: 'W'},
    cadenceCycling: {ru: 'об/мин', en: 'rpm'},
    cadenceRun: {ru: 'шагов/мин', en: 'spm'},
    cadence: {ru: '/мин.', en: '/min.'},
    pace: {ru: 'мин./км', en: 'min./km'},
    degreeCelsius: {ru: '°C', en: '°C'},
    days: {ru: 'дней', en: 'dayInMs(s)'},
  },

  sports: {
    cycling: {ru: 'Велоспорт', en: 'Cycling'},
    running: {ru: 'Бег', en: 'Running'},
    walking: {ru: 'Прогулка', en: 'Walking',},
    swimming: {ru: 'Плавание', en: 'Swimming',},
    hiking: {ru: 'Поход', en: 'Hiking'},
    training: {ru: 'Кардио', en: 'Cardio'},
    other: {ru: 'Тренировка', en: 'Training'},
    all: {ru: 'Все виды спорта', en: 'All sports'},
    allTime: {ru: 'За всё время', en: 'All-time'},
  },

  title: {
    deleteAll: {ru: 'Удалить все тренировки', en: 'Delete all workouts'},
    deleteUser: {ru: 'Удалить учётную запись', en: 'Delete account'},
    deleteUserConfirmation: {ru: 'Удалить учётную запись и все тренировки?',
      en: 'Delete account and all workouts?'},
    yes: {ru: 'Да', en: 'Yes'},
    no: {ru: 'Нет', en: 'No'},
    deleteAllWorkouts: {ru: 'Все тренировки будут удалены',
      en: 'All workouts will be deleted'},
    funnyMarkers: {ru: 'Забавные маркеры', en: 'Funny markers'},
    inDeveloping: {ru: 'Здесь будет статистика, графики\nВ разработке...',
      en: 'There will be statistics, charts\nIn developing...',},
    placeholderNote: {ru: 'О тренировке', en: 'About workout',},
    save: {ru: 'Сохранить', en: 'Save',},
    error: {ru: 'Произошла ошибка', en: 'Error'},
    add: {ru: 'Добавить', en: 'Add'},
    loading: {ru: 'Загрузка...', en: 'Loading...'},
    smoothing: {ru: 'Сглаживание', en: 'Smoothing'},
    upload: {ru: 'Загрузить', en: 'Upload'},
    settings: {ru: 'Настройки', en: 'Settings'},
    activities: {ru: 'Тренировки', en: 'Activities'},
    all: {ru: 'Все', en: 'All'},
    about: {ru: 'О проекте', en: 'About'},
    addWorkouts: {ru: 'Добавить занятия', en: 'Add workouts'},
    addActivities: {ru: 'Добавь занятия!', en: 'Add activities!'},

    dashBoard: {ru: 'Панель управления', en: 'Dashboard'},
    appLanguage: {ru: 'Язык приложения', en: 'App language'},
    title: {ru: 'Название', en: 'Title'},
    viewTraining: {ru: 'Просмотр тренировки'},
    workouts: {ru: 'Тренировки', en: 'Workouts'},
    stats: {ru: 'Статистика', en: 'Stats'},
    notes: {ru: 'Заметки', en: 'Notes'},
    powerCurve: {ru: 'Кривая мощности', en: 'Power curve'},
    resetZoom: {ru: 'Сбросить', en: 'Reset'},
    goToDashboard: {ru: 'Перейти на главную страницу', en: 'Go to main page'},
    pageNotFound: {ru: 'Упс, страница не найдена', en: 'Oops, page not found!'},
    notAvailableInDemoMode: {ru: 'Недоступно в режиме демонстрации. Создайте учетную запись!',
      en: 'Not available in demo mode. Create an account'},
    indoorWorkout:{ru: 'Занятие в помещении', en: 'Indoor workout',},
    info1: {ru: 'Используй стрелки на клавиатуре ' +
        'для управления графиками, ' +
        'а также пробел или Enter для сброса зума.'
      , en: 'Use the arrow keys on your keyboard to manage charts, ' +
        'and space or Enter to reset the zoom.'},
    info2: {ru: ' раз. Изменить значение можно в настройках',
      en: ' times. You can change the value in the settings'},
    aboutApp1:{
      ru: 'Приложение создано в образовательных целях.\n' +
        'Просматривай активности, загрузив свои треки в расширении .fit' +
        ' или скачай мои файлы по ',
      en: 'The app was created for educational purposes.\n' +
        'View activities by uploading your tracks in the .fit extension' +
        ' or download my files from ',},
    aboutApp2:{
      ru:
        '\nСтабильная поддержка следующих видов спорта: велоспорт, бег. \n' +
        'Проверено на треках с устройств: garmin, wahoo, bryton, lezyne. \n' +
        'Репозиторий: ',
      en: '\nStable support for the following sports: cycling, running. \n' +
        'Tested on records from devices: garmin, wahoo, bryton, lezyne. \n' +
        'Repository: ',},
    link:{ru: 'ссылке', en: 'the link',},
    footer1: {ru: 'Размер базы: ', en: 'Database size: '},
    footer2: {ru: ' Мб. Занимает ', en: ' Mb. Takes '},
    footer3: {ru: 'менее', en: 'up less than'},
    footer4: {ru: '% от выделенной браузером памяти.',
      en: '% of the memory allocated by the browser'},
    settingInfo: {
      ru: 'Значение величины сглаживания: ' +
        '\n1 - точки на графиках соответствуют точкам трека с твоего устройства,' +
        '\n16 - отображается усредненное значение за 16 секунд записи трека.' +
        '\nЕсли производительность устройства недостаточна, увеличь значение',
      en: 'The value of the smoothing value is: ' +
        '\n1 - points on the graphs correspond to track points from your device,' +
        '\n16 - displays the average value for 16 seconds of track recording.' +
        '\nIf the performance of the device is insufficient, increase the value',},
    nonValidateFile: {ru: 'Тип импортируемого файла не поддерживается',
     en: 'Imported file type is not supported'},
    duplicateFile: {ru: 'Этот файл уже загружен',
      en: 'This file has already been uploaded'},
    more: {ru: 'Подробнее', en: 'More'},
    add1: {ru: 'Перетяните файлы (в формате .fit) или нажмите',
      en: 'Drop files here or'},
    add2: {ru: 'для выбора', en: 'to select'},
    browse: {ru: ' Обзор', en: 'Browse'},
    searchWorkouts: {ru: 'Поиск занятий', en: 'Find workouts'},
    resultSearch1: {ru: 'Найдено ', en: 'Found '},
    resultSearch2: {ru: ' занятий по запросу ', en: ' activities for '},
    signIn: {ru: 'Войти', en: 'Sign in'},
    notAccount: {ru: 'У вас нет учетной записи? ', en: 'Don\'t have an account?   '},
    createAccount: {ru: 'Создать учетную запись', en: 'Create an account'},
    create: {ru: 'Создать', en: 'Create'},
    haveAccount: {ru: 'У вас уже есть аккаунт? ', en: 'Already have an account? '},
    login: {ru: 'Логин', en: 'Login'},
    enterEmail: {ru: 'Введите email', en: 'Enter an email'},
    password: {ru: 'Пароль', en: 'Password'},
    enterPassword: {ru: 'Введите пароль', en: 'Enter a password'},
    demo: {ru: 'Ознакомиться', en: 'Demo'},
    aboutDemo: {ru: 'Ознакомься с проектом - без смс и регистрации. Но с ограниченным функционалом на удаление и изменение активностей',
      en: 'Get acquainted with the project - without SMS and registration. But with limited functionality for deleting and changing activities'},
    out: {ru: 'Выйти', en: 'Out'},
    userWasCreated: {ru: 'Учетная запись создана', en: 'User was created'},
    serverError: {ru: 'Произошла ошибка на сервере', en: 'Server error'},
    notFound: {ru: 'Занятия не найдены', en: 'Workouts not found'},
    sports: {ru: 'Вид спорта', en: 'Sports'},
    invalidEmailPassword: {ru: 'Неверные данные для входа', en: 'Invalid email or password'},
    userAlreadyExist: {ru: 'Пользователь с таким адресом электронной почты уже существует', en: 'User with this email already exist'},
    uncorrectedEmail: {ru: 'Некорректный email', en: 'Uncorrected email'},
    uncorrectedPassword: {ru: 'Пароль должен быть не короче 8 и не более 20 символов', en: 'Password must be no shorter than 8 and no more than 20 characters'},
    7: {ru: '7 дней', en: '7 days'},
    28: {ru: '4 недели', en: '4 week'},
    180: {ru: '6 месяцев', en: '6 months'},
    365: {ru: '1 год', en: '1 year'},
    period: {ru: 'Период', en: 'Period'},
    search: {ru: 'Найти', en: 'Search'},
    avg: {ru: 'Среднее', en: 'Average'},
    noData: {ru: 'Нет активностей', en: 'No workouts'},
  },

  month:{
    0: {ru: 'Января', en: 'January'},
    1: {ru: 'Февраля', en: 'February'},
    2: {ru: 'Марта', en: 'March'},
    3: {ru: 'Апреля', en: 'April'},
    4: {ru: 'Мая', en: 'June'},
    5: {ru: 'Июня', en: 'Settings'},
    6: {ru: 'Июля', en: 'July'},
    7: {ru: 'Августа', en: 'August'},
    8: {ru: 'Сентября', en: 'September'},
    9: {ru: 'Октября', en: 'October'},
    10: {ru: 'Ноября', en: 'November'},
    11: {ru: 'Декабря', en: 'December'},
  },
  monthStrict:{
    0: {ru: 'Январь', en: 'January'},
    1: {ru: 'Февраль', en: 'February'},
    2: {ru: 'Март', en: 'March'},
    3: {ru: 'Апрель', en: 'April'},
    4: {ru: 'Май', en: 'June'},
    5: {ru: 'Июнь', en: 'Settings'},
    6: {ru: 'Июль', en: 'July'},
    7: {ru: 'Август', en: 'August'},
    8: {ru: 'Сентябрь', en: 'September'},
    9: {ru: 'Октябрь', en: 'October'},
    10: {ru: 'Ноябрь', en: 'November'},
    11: {ru: 'Декабрь', en: 'December'},
  },
};

export const configMainStats = {
  totalDistance: {
    formatter: value => convertDistance(value).toString().replace('.', ','),
    unit: 'km',
    label: 'totalDistance',
  },
  totalTimerTime: {
    formatter: getHourMinSec,
    label: 'totalTimerTime',
  },
  enhancedAvgSpeed: {
    formatter: x => convertSpeed(x).toString().replace('.', ','),
    uniqueFormatter: convertPace,
    unit: 'kmph',
    uniqueUnit: 'pace',
    uniqueSport: ['running', 'walking', 'hiking'],
    // uniqueSport: 'running',
    label: 'avgSpeed',
    uniqueLabel: 'avgPace',
  },
  totalAscent: {
    unit: 'm',
    label: 'totalAscent',
  },
  avgHeartRate: {
    unit: 'bpm',
    label: 'avgHeartRate',
  },
  maxHeartRate: {
    unit: 'bpm',
    label: 'maxHeartRate',
  },
  avgPower: {
    unit: 'w',
    label: 'avgPower',
  },
}

export let statsFields = {
  heartRate: {
    fields: [
      'maxHeartRate',
      'avgHeartRate',
    ],
    unit: 'bpm',
  },
  speed: {
    fields: [
      'maxSpeed',
      'avgSpeed',
    ],
    formatter: x => convertSpeed(x).toString().replace('.', ','),
    unit: 'kmph',
  },
  pace: {
    fields: [
      'enhancedMaxSpeed',
      'enhancedAvgSpeed',
    ],
    unit: 'pace',
    formatter: convertPace,
  },
  power: {
    fields: [
      'maxPower',
      'normalizedPower',
      'avgPower',
    ],
    unit: 'w',
  },
  time: {
    fields: [
      'totalTimerTime',
      'totalElapsedTime',
      'startTime',
      'timestamp',
    ],
    formatter: getHourMinSec,
    unit: null,
  },
  cadenceRun: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    unit: 'cadenceRun',
  },
  cadence: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    unit: 'cadenceCycling',
  },
  altitude: {
    fields: [
      'totalAscent',
      'totalDescent',
      'maxAltitude',
      'minAltitude',
    ],
    unit: 'm',
  },
  temperature: {
    fields: [
      'maxTemperature',
      'avgTemperature',
    ],
    unit: 'degreeCelsius',
  },
  other: {
    fields: [
      'totalStrides',
      'trainingStressScore',
      'totalCalories',
    ],
    unit: null,
  }
}

export const chartsConfig = {
  speed: {
    title: 'speed',
    plotLinesText: 'avgSpeed',
    plotLinesTextValue: 'kmph',
    lineColor: '#11a9ed',
    themeColor: '#11a9ed',
    reversed: false,

  },
  pace: {
    title: 'pace',
    plotLinesText: 'avgPace',
    plotLinesTextValue: 'pace',
    lineColor: 'white',
    themeColor: '#11a9ed',
    reversed: true,
  },
  power: {
    title: 'power',
    plotLinesText: 'avgPower',
    plotLinesTextValue: 'w',
    lineColor: '#6bc531',
    themeColor: '#6bc531',
    reversed: false,
  },
  heartRate: {
    title: 'heartRate',
    plotLinesText: 'avgHeartRate',
    plotLinesTextValue: 'bpm',
    lineColor: '#ff0035',
    themeColor: '#ff0035',
    reversed: false,
  },
  cadence: {
    title: 'cadence',
    plotLinesText: 'avgCadence',
    plotLinesTextValue: 'cadenceCycling',
    plotLinesTextValueRunning: 'cadenceRun',
    lineColor: '#c74cb1',
    themeColor: '#c74cb1',
    reversed: false,
  },
  altitude: {
    title: 'altitude',
    plotLinesText: 'avgAltitude',
    plotLinesTextValue: 'm',
    lineColor: '#750bc4',
    themeColor: '#750bc4',
    reversed: false,
  },
  powerCurve: {
    title: 'powerCurve',
    plotLinesTextValue: 'w',
    lineColor: '#02afaf',
    themeColor: '#02afaf',
    reversed: false,
    formatter: function (x, y) {
      if (x < 60) return `${x}${dict.units.s[userLang]}<br>${y} ${dict.units.w[userLang]}`
      else
      {
        x = getHourMinSec(x)
        return `${x}<br>${y}${dict.units.w[userLang]}`;
      }
    },
    // formatter: function (x, y, date) {
    //   if(date){
    //     if (x < 60) return `${x}${dict.units.s[userLang]}<br>${y} ${dict.units.w[userLang]}<br>${date}`
    //     else
    //     {
    //       x = getHourMinSec(x)
    //       return `${x}<br>${y}${dict.units.w[userLang]}<br>${date}`;
    //     }
    //   }
    //   else{
    //     if (x < 60) return `${x}${dict.units.s[userLang]}<br>${y} ${dict.units.w[userLang]}`
    //     else
    //     {
    //       x = getHourMinSec(x)
    //       return `${x}<br>${y}${dict.units.w[userLang]}`;
    //     }
    //   }
    // },
    options: {
      xAxis: {
        tickWidth: 1,
        tickLength: 0,
        minorTickPosition: 'outside',
        showFirstLabel: true,
        labels: {
          formatter: function () {
            if (this.value < 60) return this.value + dict.units.s[userLang];
            else return getHourMinSec(this.value)
          },
          enabled: true,
          y: 12,
        },
        min: 1,
      }
    }
  },
  powerCurveAllTime: {
    title: 'powerCurve',
    // plotLinesText: '',
    plotLinesTextValue: 'w',
    lineColor: 'rgb(90,90,90)',
    themeColor: 'rgb(90,90,90)',
    reversed: false,
  },
  // totalTimerTime: {
  //   name: 'totalTimerTime',
  //   // plotLinesText: 'avgAltitude',
  //   // plotLinesTextValue: 'm',
  //   lineColor: '#750bc4',
  //   themeColor: '#750bc4',
  //   reversed: false,
  // }
}


export const statsConfig = {
  totalWorkouts: {
    name: 'totalWorkouts',
    convert: x => x.length,
    chartsType: 'column',
    color: '#2f9a9a',
  },
  totalTimerTime: {
    unit: 'min',
    name: 'totalElapsedTime',
    convert: x => Math.round(x.reduce((sum, current) => (sum + +current[0]), 0) / 60),
    chartsType: 'column',
    color: '#8a8585'
  },
  totalDistance: {
    formatter: x => convertDistance(x),
    unit: 'km',
    name: 'totalDistance',
    convert: x => convertDistance(x.reduce((sum, current) => (sum + +current[0]), 0)),
    chartsType: 'column',
    color: 'green'
  },
  avgSpeed: {
    unit: 'kmph',
    name: 'avgSpeed',
    convert: x => convertSpeed(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    chartsType: 'spline',
    avg: x => convertSpeed(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    convertAvg: convertSpeed,
    color: '#11a9ed',
  },
  enhancedAvgSpeed: {
    unit: 'pace',
    name: 'avgPace',
    convert: x =>
      convertPaceInMinute(
        x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
        /
        x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0),
    yAxisFormatter: convertPaceInMinute,
    chartsType: 'spline',
    convertAvg: convertPace,
    color: '#11a9ed',
  },
  avgHeartRate: {
    unit: 'bpm',
    name: 'avgHeartRate',
    convert: x =>
      Math.round(
        x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
        /
        x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0),
    chartsType: 'spline',
    convertAvg: Math.round,
    color: '#ff0035',
  },
  maxHeartRate: {
    unit: 'bpm',
    name: 'maxHeartRate',
    convert: x => Math.round(x.reduce((sum, current) => Math.max(sum, +current[0]), 0)),
    chartsType: 'spline',
    convertAvg: Math.round,
    type: 'maxValue',
    color: '#83031f',
  },
  avgPower: {
    unit: 'w',
    name: 'avgPower',
    convert: x => Math.round(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    chartsType: 'spline',
    convertAvg: Math.round,
    color: '#6bc531',
  },
  avgCadence: {
    unit: 'cadence',
    name: 'avgCadence',
    convert: x => Math.round(
      x.reduce((sum, current) => (sum + (+current[0] * +current[1])), 0)
      /
      x.reduce((sum, current) => current[0] ? (sum + +current[1]) : sum, 0) || 0
    ),
    chartsType: 'spline',
    convertAvg: Math.round,
    color: '#c74cb1',
  },
  totalAscent: {
    unit: 'm',
    name: 'totalAscent',
    convert: x => Math.round(x.reduce((sum, current) => (sum + +current[0]), 0)),
    chartsType: 'column',
    color: '#750bc4',
  },
  totalCalories: {
    name: 'totalCalories',
    convert: x => Math.round(x.reduce((sum, current) => (sum + +current[0]), 0)),
    chartsType: 'column',
    color: '#c47237',
  },
}
