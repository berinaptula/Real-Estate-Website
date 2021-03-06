import moment from 'moment';

const adsArr = [{
        type: 'apartment',
        price: 318000,
        adress: "Zilvermeeuw 51",
        published: moment().subtract(21, 'days'),
        city: 'Hoogvliet Rotterdam',
        postcode: '3192 PD',
        floorArea: 94,
        plotArea: 108,
        rooms: 5,
        photo: 'media/img/ad1.jpg',
        constructionType: 'new',
        balcony: true,
        roofTerrace: true,
        garden: true,
        id: 'ad1',
        gallery: ['media/img/ad1.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'apartment',
        price: 269000,
        adress: "Goudslagersgaarde 18",
        published: moment().subtract(4, 'hours'),
        city: 'The Hague',
        postcode: '2542 ER',
        floorArea: 116,
        plotArea: 4073,
        rooms: 5,
        photo: 'media/img/ad2.jpg',
        constructionType: 'new',
        balcony: true,
        roofTerrace: false,
        garden: true,
        id: 'ad2',
        gallery: ['media/img/ad2.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'house',
        price: 375000,
        adress: "Eendendreef 24",
        published: moment().subtract(11, 'days'),
        city: 'Bleiswijk',
        postcode: '2665 TA',
        floorArea: 127,
        plotArea: 238,
        rooms: 4,
        photo: 'media/img/ad3.jpg',
        constructionType: 'resale',
        balcony: true,
        roofTerrace: true,
        garden: false,
        id: 'ad3',
        gallery: ['media/img/ad3.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'house',
        price: 289000,
        adress: "Botreep 78",
        published: moment().subtract(21, 'days'),
        city: 'Hoogvliet Rotterdam',
        postcode: '3192 PD',
        floorArea: 140,
        plotArea: 177,
        rooms: 5,
        photo: 'media/img/ad4.jpg',
        constructionType: 'new',
        balcony: false,
        roofTerrace: false,
        garden: false,
        id: 'ad4',
        gallery: ['media/img/ad4.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'house',
        price: 900000,
        adress: "Vijverweg 7",
        published: moment().subtract(1, 'days'),
        city: 'Rotterdam',
        postcode: '3192 PD',
        floorArea: 231,
        plotArea: 160,
        rooms: 3,
        photo: 'media/img/ad5.jpg',
        constructionType: 'resale',
        balcony: false,
        roofTerrace: false,
        garden: false,
        id: 'ad5',
        gallery: ['media/img/ad5.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'apartment',
        price: 225000,
        adress: "Adrianstraat 96",
        published: moment().subtract(4, 'days'),
        city: 'Rotterdam',
        postcode: '3014 XR',
        floorArea: 83,
        plotArea: null,
        rooms: 4,
        photo: 'media/img/ad6.jpg',
        constructionType: 'new',
        balcony: false,
        roofTerrace: false,
        garden: false,
        id: 'ad6',
        gallery: ['media/img/ad6.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'apartment',
        price: 450000,
        adress: "Schiehavenkade 244",
        published: moment().subtract(33, 'days'),
        city: 'Rotterdam',
        postcode: '3024 EZ',
        floorArea: 115,
        plotArea: null,
        rooms: 4,
        photo: 'media/img/ad7.jpg',
        constructionType: 'resale',
        balcony: false,
        roofTerrace: false,
        garden: false,
        id: 'ad7',
        gallery: ['media/img/ad7.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'apartment',
        price: 259000,
        adress: "Drinkwaterweg 425",
        published: moment().subtract(3, 'days'),
        city: 'Rotterdam',
        postcode: '3063 VD',
        floorArea: 86,
        plotArea: null,
        rooms: 3,
        photo: 'media/img/ad8.jpg',
        constructionType: 'new',
        balcony: true,
        roofTerrace: true,
        garden: true,
        id: 'ad8',
        gallery: ['media/img/ad8.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'apartment',
        price: 550000,
        adress: "Wijnhaven 33 D",
        published: moment().subtract(8, 'days'),
        city: 'Rotterdam',
        postcode: '3011 WH',
        floorArea: 145,
        plotArea: null,
        rooms: 4,
        photo: 'media/img/ad9.jpg',
        constructionType: 'new',
        balcony: false,
        roofTerrace: true,
        garden: false,
        id: 'ad9',
        gallery: ['media/img/ad9.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },
    {
        type: 'apartment',
        price: 685000,
        adress: "Coolhaven 253",
        published: moment().subtract(11, 'days'),
        city: 'Rotterdam',
        postcode: '3011 WH',
        floorArea: 154,
        plotArea: null,
        rooms: 4,
        photo: 'media/img/ad10.jpg',
        constructionType: 'new',
        balcony: true,
        roofTerrace: false,
        garden: true,
        id: 'ad10',
        gallery: ['media/img/ad10.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg'],
        liked: false
    },

]
export {
    adsArr as
    default
}