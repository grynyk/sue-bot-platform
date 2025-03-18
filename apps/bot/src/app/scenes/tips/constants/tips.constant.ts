import {
  TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK,
  TIPS_MAIN_BUTTON_CALLBACK,
  TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK,
} from '../enums/tips.enum';
import { TipsSceneStructure } from '../models/tips.model';

export const TIPS: TipsSceneStructure = {
  CALLBACKS: {
    MAIN: TIPS_MAIN_BUTTON_CALLBACK,
    DYNAMIC_AFFIRMATION: TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK,
    MUSIC_AFFIRMATION: TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK,
  },
  LABELS: {
    MAIN: {
      [TIPS_MAIN_BUTTON_CALLBACK.PROTEIN]: 'Рослинні джерела білка',
      [TIPS_MAIN_BUTTON_CALLBACK.VITAMIN_C]: 'Джерело вітаміну С',
      [TIPS_MAIN_BUTTON_CALLBACK.OMEGA]: 'Джерело омега',
      [TIPS_MAIN_BUTTON_CALLBACK.CALCIUM]: 'Джерело кальцію',
      [TIPS_MAIN_BUTTON_CALLBACK.IRON]: 'Джерело заліза',
      [TIPS_MAIN_BUTTON_CALLBACK.SELENIUM]: 'Джерело селену',
      [TIPS_MAIN_BUTTON_CALLBACK.ZINC]: 'Джерело цинку',
      [TIPS_MAIN_BUTTON_CALLBACK.ANTIOXIDANT]: 'Продукти-антиоксиданти',
      [TIPS_MAIN_BUTTON_CALLBACK.DYNAMIC_AFFIRMATIONS]: 'Динамічні афірмації',
      [TIPS_MAIN_BUTTON_CALLBACK.MUSIC_AFFIRMATIONS]: 'Музичні афірмації',
    },
    DYNAMIC_AFFIRMATION: {
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.LUCK]: 'На удачу',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.LOVE]: 'Сила кохання',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.PASSION]: 'Сила пристрасті',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.HEALTH]: `Сила здоров'я та молодості`,
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.FAMILY]: 'Сила родини та багатства',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.MONEY]: 'Сила грошей',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.FEMALE]: 'Жіноча сила',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.MOTHERHOOD]: 'Сила материнства',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.BEAUTY]: 'Сила краси',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.MIND]: 'Сила розуму',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.SUCCESS]: 'Сила успіху та тріумфу',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.PEACE_VICTORY]: 'Для миру та перемоги',
    },
    MUSIC_AFFIRMATION: {
      [TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK.MARRIAGE]: 'Міцний шлюб',
      [TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK.FAMILY]: 'Сила роду',
      [TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK.FEMALE]: 'Жіноча сила',
    },
  },
  RESPONSES: {
    MAIN: {
      [TIPS_MAIN_BUTTON_CALLBACK.PROTEIN]: `*Рослинні джерела білка:*\n\n• Бобові: квасоля, нут, горох, маш\n• Овочі: броколі, шпинат, спаржа, салат\n• Насіння: гарбузове, чіа, льон\n• Горіхи: мигдаль, кеш'ю, фісташки, кедрові, волоські, фундук, пекан, макадамія\n• Спіруліна\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.VITAMIN_C]: `*Джерело вітаміну С:*\n\n• Журавлина\n• Ацерола\n• Шипшина\n• Ламінарія та спіруліна\n• Матча\n• Цитрусові\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.OMEGA]: `*Джерало Омега:*\n\n• Насіння чіа\n• Насіння льону\n• Насіння хемп\n• Волоські горіхи\n• Водорості: норі, спіруліна, хлорела 🌱\n• Авокадо\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.CALCIUM]: `*Джерело кальцію:*\n\n• Овочі: броколі, шпинат, батат, капуста кале\n• Фрукти: ківі, абрикос, ананас\n• Насіння: чіа, кунжут, мак\n• Горіхи: бразильський, кеш’ю, фундук\n• Соєве молоко та соєві продукти 🌱\n• Бобові: нут, біла квасоля\n• Морська капуста /ламінарія/\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.IRON]: `*Джерело заліза:*\n\n• Червона квасоля\n• Горіхи\n• Сухофрукти, особливо курага та інжир\n• Соєве борошно\n• Кіноа\n• Насіння гарбуза\n• Шпинат\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.SELENIUM]: `*Джерело селену:*\n\n• Овочі: броколі, спаржа, шпинат, морква\n• Фрукти: банани, цитрусові, манго\n• Горіхи: бразильський, кеш'ю, пекан\n• Насіння: чіа, соняшник\n• Тофу, соєве молоко\n• Коричневий рис\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.ZINC]: `*Джерело цинку:*\n\n• Насіння хемп, кунжут, насіння соняшника, насіння гарбуза\n• Кіноа\n• Кеш'ю, макадамія, пекан\n• Квасоля, нут\n• Шпинат\n• Чорний шоколад\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.ANTIOXIDANT]: `*Продукти–антиоксиданти:*\n\n• Авокадо\n• Броколі\n• Ягоди: полуниця, чорниця\n• Куркума\n• Чорний шоколад /какао терте/\n• Спіруліна\n• Хлорела\n`,
      [TIPS_MAIN_BUTTON_CALLBACK.DYNAMIC_AFFIRMATIONS]: 'Динамічні афірмації:',
      [TIPS_MAIN_BUTTON_CALLBACK.MUSIC_AFFIRMATIONS]: 'Музичні афірмації:',
    },
    DYNAMIC_AFFIRMATION: {
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.LUCK]: 'https://www.youtube.com/watch?v=1AYxj8dHLYQ',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.LOVE]:
        'https://www.youtube.com/watch?v=rH8HuQr7Wd0&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=8',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.PASSION]:
        'https://www.youtube.com/watch?v=K7mlcrI-90E&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=3',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.HEALTH]: `https://www.youtube.com/watch?v=Jw3g5qK4Ifw&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=4`,
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.FAMILY]:
        'https://www.youtube.com/watch?v=E-s_O-OtCyM&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=9',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.MONEY]:
        'https://www.youtube.com/watch?v=2QbJIsxN2Qo&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=12',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.FEMALE]:
        'https://www.youtube.com/watch?v=A06Hm7-3PMU&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=16',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.MOTHERHOOD]:
        'https://www.youtube.com/watch?v=fypluiE6-ME&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=2',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.BEAUTY]:
        'https://www.youtube.com/watch?v=y0BrAC3i1W0&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=19',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.MIND]:
        'https://www.youtube.com/watch?v=8fhz396wz9Y&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=21',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.SUCCESS]:
        'https://www.youtube.com/watch?v=Q77IwrJfKUY&list=PLx3JWAOdkC8hOdkhs1jVFQOazLoe56Ypo&index=20',
      [TIPS_DYNAMIC_AFFIRMATION_BUTTON_CALLBACK.PEACE_VICTORY]: 'https://www.youtube.com/watch?v=JW13oLJ9MBE',
    },
    MUSIC_AFFIRMATION: {
      [TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK.MARRIAGE]:
        'https://www.youtube.com/watch?v=qmPCfPROQoc&list=PLx3JWAOdkC8jyBkU8pmRayrqjG0cIyK4Y&index=3',
      [TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK.FAMILY]:
        'https://www.youtube.com/watch?v=wBFfEHCAWHU&list=PLx3JWAOdkC8jyBkU8pmRayrqjG0cIyK4Y&index=4',
      [TIPS_MUSIC_AFFIRMATION_BUTTON_CALLBACK.FEMALE]:
        'https://www.youtube.com/watch?v=ncjkZ1f9gbc&list=PLx3JWAOdkC8jyBkU8pmRayrqjG0cIyK4Y&index=8',
    },
  },
};
