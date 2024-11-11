

export const menuLists=[
    {
        id:1,
        path:'/',
        link:"home"
    },
    {
        id:2,
        path:'/product',
        link:"product"
    },
    {
        id:3,
        path:'/blog',
        link:"Blog"
    },
    {
        id:4,
        path:'/about',
        link:"About"
    },
    {
        id:5,
        path:'/services',
        link:"services"
    },
    {
        id:6,
        path:'/contact',
        link:"contact"
    },

];


export const categorylists=[

    {
        id:1,
        image: 'images/categoryImg/c1.png',
        title:'watches'
    },
    {
        id:2,
        image: 'images/categoryImg/c2.png',
        title:'electronics'
    },
    {
        id:3,
        image: 'images/categoryImg/c3.png',
        title:'sports'
    }, {
        id:4,
        image: 'images/categoryImg/c4.png',
        title:'real estate'
    }, {
        id:5,
        image: 'images/categoryImg/c5.png',
        title:'vehicle'
    },
    {
        id:6,
        image: 'images/categoryImg/c6.png',
        title:'jewelry'
    }, {
        id:7,
        image: 'images/categoryImg/c7.png',
        title:'clothes'
    }
    
]




export const productlists = [
    // Watches
    {
      _id: "product-1",
      image: "https://img.freepik.com/free-photo/close-up-clock-with-time-change_23-2149241166.jpg?t=st=1731327245~exp=1731330845~hmac=67d16961063b9f4f73116d8dccc550180bf4bbdc789820448df4a3601849e7b5&w=996",
      category: "Watches",
      totalBids: 10,
      isSoldout: false,
      title: "Luxury Watch",
      biddingPrice: 150.99,
      price: 300.0,
    },
    {
      _id: "product-2",
      image: "https://img.freepik.com/free-photo/gray-scale-shot-black-watch_181624-422.jpg?t=st=1731327301~exp=1731330901~hmac=2ecaea5bfd41113a57aa524ce9c2d8bd5446102017ffedfb316de3bd3e3c1a94&w=996",
      category: "Watches",
      totalBids: 7,
      isSoldout: true,
      title: "Sport Watch",
      biddingPrice: 75.5,
      price: 120.0,
    },
  
    // Electronics
    {
      _id: "product-3",
      image: "https://img.freepik.com/free-photo/still-life-tech-device_23-2150722691.jpg?t=st=1731327461~exp=1731331061~hmac=7e39e4e2fc5203eafcfc6df914a57d78e36d9dfff017d8107a53594229bfc1b7&w=996",
      category: "Electronics",
      totalBids: 12,
      isSoldout: false,
      title: "Bluetooth Headphones",
      biddingPrice: 90.0,
      price: 150.0,
    },
    {
      _id: "product-4",
      image: "https://img.freepik.com/free-photo/landscape-nature-scene-tv-appliance-generative-ai_188544-12122.jpg?t=st=1731327552~exp=1731331152~hmac=3acf33286ecba62f1cbd64049136178b8859a968bfcbb873bab9849c38c65d10&w=1060",
      category: "Electronics",
      totalBids: 25,
      isSoldout: false,
      title: "4K Smart TV",
      biddingPrice: 400.0,
      price: 700.0,
    },
  
    // Sports
    {
      _id: "product-5",
      image: "https://img.freepik.com/free-photo/faceless-woman-checking-fitness-health-tracking-wearable-device-her-hand-unknown-female-white-top-posing-outdoor-stadium-sunset_176532-14640.jpg?t=st=1731327608~exp=1731331208~hmac=6b7ec614409d5b78412cf78ae844079a890b0b7a8929eeeb18549ec67abcb7d2&w=996",
      category: "Sports",
      totalBids: 5,
      isSoldout: true,
      title: "Fitness Tracker",
      biddingPrice: 50.0,
      price: 100.0,
    },
    {
      _id: "product-6",
      image: "https://img.freepik.com/free-photo/full-shot-man-riding-bike_23-2148790121.jpg?t=st=1731327672~exp=1731331272~hmac=21a2dbf3ca3b437e4862e688a0ba31844bc4cf1c96d3fafc65c7a21499f14122&w=996",
      category: "Sports",
      totalBids: 18,
      isSoldout: false,
      title: "Mountain Bike",
      biddingPrice: 300.0,
      price: 500.0,
    },
  
    // Real Estate
    {
      _id: "product-7",
      image: "https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv-working-table_105762-2016.jpg?t=st=1731327716~exp=1731331316~hmac=70afe21bbdfc90cdfcc93130dfa45b75294a6b8b3615a6dd645aa012a5fc75c7&w=996",
      category: "Real Estate",
      totalBids: 2,
      isSoldout: false,
      title: "Luxury Apartment",
      biddingPrice: 200000.0,
      price: 350000.0,
    },
    {
      _id: "product-8",
      image: "https://img.freepik.com/free-photo/office-buildings-with-modern-architecture_107420-95734.jpg?t=st=1731327532~exp=1731331132~hmac=353d59f59fcf2a101b01088ded3c3c441273dbddead973249166f15e3781775e&w=996",
      category: "Real Estate",
      totalBids: 4,
      isSoldout: true,
      title: "Commercial Property",
      biddingPrice: 300000.0,
      price: 500000.0,
    },
  
    // Vehicle
    {
      _id: "product-9",
      image: "https://img.freepik.com/free-photo/plugged-charger-into-electric-car-charge-station_1268-17715.jpg?t=st=1731327847~exp=1731331447~hmac=f773c05426eafc34a9c163a1bcfd293253d19b39ee4b33745b38e62a697b55a1&w=1060",
      category: "Vehicle",
      totalBids: 14,
      isSoldout: false,
      title: "Electric Car",
      biddingPrice: 15000.0,
      price: 25000.0,
    },
    {
      _id: "product-10",
      image: "https://img.freepik.com/free-photo/high-angle-old-motorcycle-outdoors_23-2148703221.jpg?t=st=1731327911~exp=1731331511~hmac=8f0ff64bd6413639afe87c22a3530ea615d79031fac02db544eedd4a754d4a90&w=360",
      category: "Vehicle",
      totalBids: 6,
      isSoldout: false,
      title: "Motorbike",
      biddingPrice: 5000.0,
      price: 9000.0,
    },
  
    // Jewelry
    {
      _id: "product-11",
      image: "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7946.jpg?t=st=1731328000~exp=1731331600~hmac=31d6669fd37f5571a0c82acbaf123757d57ba2e36080dfda0c72aa2d7bc72287&w=360",
      category: "Jewelry",
      totalBids: 8,
      isSoldout: true,
      title: "Gold Necklace",
      biddingPrice: 800.0,
      price: 1200.0,
    },
    {
      _id: "product-12",
      image: "https://img.freepik.com/free-photo/beautiful-engagement-ring-with-diamonds_23-2149509250.jpg?t=st=1731328040~exp=1731331640~hmac=3e92942442c623a0a9d1263563f7e3782e1cde2c28cb8ca935f3ab81a2269da6&w=996",
      category: "Jewelry",
      totalBids: 20,
      isSoldout: false,
      title: "Diamond Ring",
      biddingPrice: 3000.0,
      price: 5000.0,
    },
  

    {
      _id: "product-13",
      image: "https://img.freepik.com/free-photo/still-life-rendering-jackets-display_23-2149745028.jpg?t=st=1731328085~exp=1731331685~hmac=732adfa8ddaa0f1dc50e903c2f82091ff4a34ceccc948f8db70295a9c4df8784&w=996",
      category: "Clothes",
      totalBids: 9,
      isSoldout: false,
      title: "Designer Jacket",
      biddingPrice: 120.0,
      price: 200.0,
    },
    {
      _id: "product-14",
      image: "https://img.freepik.com/free-photo/male-brown-footwear-close-up_1303-10300.jpg?t=st=1731328120~exp=1731331720~hmac=7aa543653485db16474ee22074cbf14824df67e546ead1594c83e06de84dddba&w=996",
      category: "Clothes",
      totalBids: 12,
      isSoldout: true,
      title: "Leather Shoes",
      biddingPrice: 75.0,
      price: 130.0,
    },
  
  
    {
      _id: "product-15",
      image: "https://img.freepik.com/free-photo/man-using-smartwatch_1301-1411.jpg?t=st=1731328166~exp=1731331766~hmac=912f085cb346897b0aac08a7809f8f6ae3e640c8c6a7066bca01bfc72f5adf11&w=996",
      category: "Watches",
      totalBids: 4,
      isSoldout: false,
      title: "Smart Watch",
      biddingPrice: 50.0,
      price: 90.0,
    },
    {
      _id: "product-16",
      image: "https://img.freepik.com/free-photo/top-view-woman-holding-tablet_23-2149762489.jpg?t=st=1731328240~exp=1731331840~hmac=16e665f517bb4e04ca6ee0944eb98e9982971daa155a798c31120277ecfefb20&w=996",
      category: "Electronics",
      totalBids: 5,
      isSoldout: false,
      title: "Tablet",
      biddingPrice: 150.0,
      price: 300.0,
    },
    {
      _id: "product-17",
      image: "https://img.freepik.com/free-photo/hand-holding-racket_23-2147644559.jpg?t=st=1731328290~exp=1731331890~hmac=a0e395649e6db5ada3b394b2c1b88bf694f5f96b0eb5d4628dab276ed17b8c20&w=996",
      category: "Sports",
      totalBids: 3,
      isSoldout: true,
      title: "Tennis Racket",
      biddingPrice: 30.0,
      price: 60.0,
    },
    {
      _id: "product-18",
      image: "https://img.freepik.com/free-photo/motor-engine-funky-road-motorbike_1172-381.jpg?t=st=1731328347~exp=1731331947~hmac=d4a2d71e7a1042b688157f651449e79fdddf7ff539acc2e7cbefcb1c1a898656&w=740",
      category: "Vehicle",
      totalBids: 10,
      isSoldout: false,
      title: "Scooter",
      biddingPrice: 400.0,
      price: 800.0,
    },
    {
      _id: "product-19",
      image: "https://img.freepik.com/free-photo/jewellery-bangle-background-with-place-text-banner-fashion-accessories_460848-13231.jpg?t=st=1731328413~exp=1731332013~hmac=daedaa9ca504ea7e628ff13c642cace3848b99ab7a804f8249d9f12323627b18&w=900",
      category: "Jewelry",
      totalBids: 2,
      isSoldout: true,
      title: "Silver Bracelet",
      biddingPrice: 100.0,
      price: 150.0,
    },
    {
      _id: "product-20",
      image: "https://img.freepik.com/free-photo/close-up-young-man-blue-denim-shirt_23-2148130363.jpg?t=st=1731328467~exp=1731332067~hmac=4168f0e8bf1deb7578cf0a4f40cd0a4b577e18b1733b5f1f2ade2daa6693e144&w=996",
      category: "Clothes",
      totalBids: 1,
      isSoldout: false,
      title: "Casual Shirt",
      biddingPrice: 20.0,
      price: 40.0,
    },
    {
      _id: "product-21",
      image: "https://img.freepik.com/free-photo/close-up-clock-with-time-change_23-2149241144.jpg?t=st=1731328515~exp=1731332115~hmac=bab5c2a6cf98f72bbdaeb2d4ef3fe0ca772bf231f8e645dbb79d0149abbdef2f&w=996",
      category: "Watches",
      totalBids: 11,
      isSoldout: false,
      title: "Classic Watch",
      biddingPrice: 80.0,
      price: 140.0,
    },
    {
      _id: "product-22",
      image: "https://img.freepik.com/free-photo/high-angle-controllers-headphones_23-2149829136.jpg?t=st=1731328582~exp=1731332182~hmac=a3f0d61abac5f6a5f3dd5292081354dd6111fdef9966d8f7fcf16dbd04192a27&w=996",
      category: "Electronics",
      totalBids: 9,
      isSoldout: true,
      title: "Gaming Console",
      biddingPrice: 250.0,
      price: 400.0,
    },
    {
      _id: "product-23",
      image: "https://img.freepik.com/free-photo/kid-meditating-yoga-mat-top-view_23-2149887938.jpg?t=st=1731328625~exp=1731332225~hmac=f68622f58669e50219a95d440bc368775ae1a726841c019ade37748b8540a6e9&w=996",
      category: "Sports",
      totalBids: 6,
      isSoldout: false,
      title: "Yoga Mat",
      biddingPrice: 10.0,
      price: 20.0,
    },
    {
      _id: "product-24",
      image: "https://img.freepik.com/free-photo/wide-angle-shot-camping-de-nolle-vlissingen-netherlands-blue-sky_181624-19410.jpg?t=st=1731328681~exp=1731332281~hmac=d10ebff51659c0662bbf432f022942708f78cb6670e874c31557cdf7895759c4&w=996",
      category: "Real Estate",
      totalBids: 3,
      isSoldout: true,
      title: "Beach House",
      biddingPrice: 500000.0,
      price: 750000.0,
    },
    {
      _id: "product-25",
      image: "https://img.freepik.com/free-photo/bridal-earrings-lie-wooden-surface_8353-9650.jpg?t=st=1731328744~exp=1731332344~hmac=cb253c75340b39fbb577f521340355e69c51be6af77762d972082f5b0fc59d63&w=996",
      category: "Jewelry",
      totalBids: 15,
      isSoldout: false,
      title: "Pearl Earrings",
      biddingPrice: 200.0,
      price: 350.0,
    },
  ];
  