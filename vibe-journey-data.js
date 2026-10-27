/* ---------------------------------------------------------------------------
   Personalised Student Journey — demo dataset
   Source: "personalised student journey" Google Sheet (AUS Data) + the
   per-property "Final Output" Google Docs it links to.
   https://docs.google.com/spreadsheets/d/1YkBo95leK_OJ557Ni_YgF6dl4YkOvg3oruVbKla1AhA

   REAL (straight from the docs): property, neighbourhood, address, room-type
   names + weekly-from prices, bills included, on-site facilities, and every
   nearby amenity name grouped by category (gyms, cinema, cafés, restaurants,
   parks, transport, universities, pubs, libraries, supermarkets, healthcare).

   MODELLED for the demo (clearly labelled in the UI):
   - tenure lengths and the offers / discounted prices (the docs give the
     weekly "from" price only),
   - walking distance per amenity (docs name the place but give no distance —
     the page shows a demo estimate until a Maps/Places API is connected),
   - the vibe score, which is computed live in the page from the real counts
     above (see computeVibes() — "logic set up for each vibe").
   To go fully live, replace window.HOSJ via an API returning this same shape.
--------------------------------------------------------------------------- */
window.HOSJ = {
  currency: { AUD: "A$" },
  // Neighbourhood categories used for "Neighbourhood categorisation" (city-wise)
  nbhCategories: {
    "Campus & academic": { e:"🎓", desc:"Walk-to-campus, study-first areas" },
    "Cultural & riverside": { e:"🎭", desc:"Arts, markets, river and nightlife" },
    "City centre": { e:"🏙️", desc:"CBD living, transport hubs, everything on the doorstep" }
  },
  cities: [
    { slug:"melbourne", name:"Melbourne", country:"au" },
    { slug:"sydney", name:"Sydney", country:"au" },
    { slug:"brisbane", name:"Brisbane", country:"au" }
  ],
  properties: [
    {
      id:"student-village-melbourne", name:"Student Village – University of Melbourne Campus",
      slug:"student-village-university-of-melbourne-campus", url:"https://houseofstudent.com/au/melbourne/student-village-university-of-melbourne-campus",
      city:"melbourne", nbh:"Carlton", nbhCat:"Campus & academic", ccy:"AUD",
      address:"108–128 Leicester St, Carlton VIC 3053",
      bills:["Wi-Fi","Electricity","Water"],
      facilities:["Study rooms","Social spaces","Games room","On-site events","Craft workshops","Cooking classes","Gym","Swimming pool","Basketball court","Study support & wellbeing","On-site management","On-site maintenance","On-site security","Secure door entry"],
      tenures:[52,44,26],
      offers:[
        {kind:"free_weeks", value:2, from:44, label:"2 weeks rent free on 44-week bookings"},
        {kind:"cashback", value:300, label:"A$300 welcome cashback"}
      ],
      rooms:[
        {name:"Standard Studio", bed:"Studio", weekly:399},
        {name:"Large Studio Apartment", bed:"Studio", weekly:445},
        {name:"Studio – Superior", bed:"Studio", weekly:469},
        {name:"Studio Superior with Balcony", bed:"Studio", weekly:489},
        {name:"Studio Large with Air-Con", bed:"Studio", weekly:479},
        {name:"4 Bedroom Apartment", bed:"Shared · ensuite room", weekly:419},
        {name:"4 Bedroom Apartment (Ensuite)", bed:"Shared · ensuite room", weekly:435},
        {name:"Large Studio Twin Share", bed:"Twin share", weekly:329}
      ],
      amenities:{
        universities:["University of Melbourne","Victoria University","William Angliss Institute"],
        gyms:["On-site Gym","Anytime Fitness Carlton","Zap Fitness Carlton","Melbourne City Baths","Fernwood Fitness Carlton (women's)"],
        cinemas:["Nova Cinema Carlton","Cinema Nova Lygon St","Melbourne Central Hoyts"],
        cafes:["Stovetop","Plus Coffee & Kitchen","University Cafe","Heart of Carlton","Humble Rays"],
        restaurants:["Piccolo Mondo Italian","Capitano Carlton","Johnny, Vince & Sam's","Il Gambero"],
        parks:["University Square Park","Argyle Square","Carlton Gardens","Princes Park"],
        supermarkets:["Woolworths Carlton","Coles Express Carlton","Mr Dad Asian Supermarket","Gertrude Grocer"],
        transport:["Melbourne University / Grattan St (bus)","Lygon St / Grattan St (bus)","Melbourne University / Swanston St #1 (tram)","Parkville Railway Station"],
        libraries:["ABP Library (Uni of Melbourne)","Carlton Library","City Library"],
        pubs:["The Queensberry Hotel","The Lincoln","Prince Alfred Carlton"],
        healthcare:["Carlton Medical Centre","PrimeCare Medical","Royal Melbourne Hospital"]
      }
    },
    {
      id:"scape-swanston", name:"Scape Swanston",
      slug:"scape-swanston", url:"https://houseofstudent.com/au/melbourne/scape-swanston",
      city:"melbourne", nbh:"Melbourne CBD", nbhCat:"City centre", ccy:"AUD",
      address:"5 Little La Trobe Street, Melbourne VIC 3000",
      bills:["Wi-Fi","Water","Heating","Gas","Electricity"],
      facilities:["Study lounge","Study rooms","Lounge area","Social spaces","Games room","Rooftop Cinema","Rooftop terrace","Gym","Communal kitchen","On-site events","On-site management","On-site laundry","Bike storage","Campus shuttle","24-hour security","On-site security","Secure door entry","CCTV","Sonder Safety App"],
      tenures:[52,44,26],
      offers:[
        {kind:"percent", value:5, label:"Early-bird 5% off weekly rent"},
        {kind:"cashback", value:200, label:"A$200 refer-a-friend credit"}
      ],
      rooms:[
        {name:"Twin Studio", bed:"Twin share", weekly:389},
        {name:"Ultra Twin Apartment", bed:"Twin share", weekly:389},
        {name:"Twin Studio – City View", bed:"Twin share", weekly:399},
        {name:"Ultra Twin Apartment – City Views", bed:"Twin share", weekly:399},
        {name:"Signature Studio", bed:"Studio", weekly:509},
        {name:"Signature Plus Studio", bed:"Studio", weekly:509},
        {name:"Signature Studio – City View", bed:"Studio", weekly:519},
        {name:"Signature Plus Studio – City View", bed:"Studio", weekly:539},
        {name:"Suite Studio", bed:"Studio", weekly:629},
        {name:"Ultra Studio", bed:"Studio", weekly:689},
        {name:"Suite Plus Studio", bed:"Studio", weekly:749},
        {name:"Ultra Studio Suite", bed:"Studio", weekly:819}
      ],
      amenities:{
        universities:["University of Melbourne","Victoria University","William Angliss Institute"],
        gyms:["On-site Gym","Fitness First Melbourne Central Platinum","Melbourne City Baths","Goodlife Health Clubs QV"],
        cinemas:["Rooftop Cinema (on-site)","Hoyts Melbourne Central","Village Cinemas Crown"],
        cafes:["Nox Coffee Bar","Little Nooky Cafe La Trobe","Charles La Trobe Coffee Co"],
        restaurants:["HWKR Food Centre","Shanghai Street Dumpling","Mamak","Izakaya Hachibeh","Tipo 00"],
        parks:["Flagstaff Gardens","Carlton Gardens","State Library Victoria grounds"],
        supermarkets:["Coles Melbourne Central","Woolworths Melbourne Central","Downtown Grocer","Crown Asian Supermarket"],
        transport:["Melbourne Central Station (train + tram)","La Trobe St Tram Stop #6","Swanston St Tram Stop #8","Melbourne Central / Lonsdale St (bus)"],
        libraries:["State Library Victoria","City Library"],
        pubs:["The Oxford Scholar Hotel","Duke of Kent Hotel"],
        healthcare:["La Trobe Street Medical","William Angliss Institute Medical Centre"]
      }
    },
    {
      id:"unsw-village", name:"UNSW Village",
      slug:"unsw-village", url:"https://houseofstudent.com/au/sydney/unsw-village",
      city:"sydney", nbh:"Kensington", nbhCat:"Campus & academic", ccy:"AUD",
      address:"UNSW Sydney (B10), High St, Kensington NSW 2033",
      bills:["Electricity","Gas","Water","Wi-Fi"],
      facilities:["On-site laundry","On-site maintenance","Village dinners","Games room","Trivia nights","Cultural food nights","E-library","DIY workshops","Cooking classes","On-site security"],
      tenures:[52,44],
      offers:[
        {kind:"free_weeks", value:1, from:52, label:"1 week free on 52-week bookings"},
        {kind:"cashback", value:250, label:"A$250 move-in cashback"}
      ],
      rooms:[
        {name:"Eight Bedrooms", bed:"Shared · own room", weekly:395},
        {name:"Six Bedrooms", bed:"Shared · own room", weekly:413},
        {name:"Seven Bedrooms", bed:"Shared · own room", weekly:419},
        {name:"Five Bedrooms", bed:"Shared · own room", weekly:420},
        {name:"Three Bedrooms", bed:"Shared · own room", weekly:429.5},
        {name:"Four Bedrooms", bed:"Shared · own room", weekly:440},
        {name:"Two Bedrooms", bed:"Shared · own room", weekly:443},
        {name:"Studio Apartment", bed:"Studio", weekly:546.5},
        {name:"Accessible Studio", bed:"Studio · accessible", weekly:580.5},
        {name:"One Bedroom Apartment", bed:"1-bed apartment", weekly:588},
        {name:"One Bedroom Apartment – Large", bed:"1-bed apartment", weekly:623},
        {name:"One Bedroom Apartment Premium", bed:"1-bed apartment", weekly:646}
      ],
      amenities:{
        universities:["UNSW Sydney (on campus)","University of Sydney","University of Technology Sydney","University of Notre Dame","Raffles College of Design & Commerce","AFTRS"],
        gyms:["UNSW Fitness & Aquatic Centre","Anytime Fitness Kensington","F45 Training Randwick"],
        cinemas:["Ritz Cinema Randwick","Event Cinemas Bondi Junction"],
        cafes:["The White House (UNSW)","Coffee on Campus (UNSW)","The Little Kitchen"],
        restaurants:["Noodle King","Sushi Train Kensington","Oporto Kensington","Mamak Village"],
        parks:["Centennial Park","Kensington Park","Moore Park","Queens Park"],
        supermarkets:["Woolworths Metro UNSW","Coles Kensington","ALDI Randwick","IGA X-Press Kensington"],
        transport:["UNSW Anzac Parade Gate 8 (bus)","UNSW High Street Gate 2 (bus)","UNSW High Street Light Rail","Randwick Light Rail","Central Station"],
        libraries:["UNSW Main Library","UNSW Law Library","UNSW Health Sciences Library","Randwick City Library"],
        pubs:["The Whitehouse (UNSW)","The Doncaster Hotel","The Royal Hotel Randwick","Coogee Bay Hotel"],
        healthcare:["UNSW Health Service","Randwick Medical Centre","Prince of Wales Hospital"]
      }
    },
    {
      id:"scape-tribune", name:"Scape Tribune",
      slug:"scape-tribune", url:"https://houseofstudent.com/au/brisbane/scape-tribune",
      city:"brisbane", nbh:"South Brisbane", nbhCat:"Cultural & riverside", ccy:"AUD",
      address:"60 Tribune Street, South Brisbane QLD 4101",
      bills:["Wi-Fi","Water","Heating","Gas","Electricity"],
      facilities:["Study rooms","Study lounge","Social spaces","Lounge area","Games room","Cinema Room","On-site events","Gym","On-site laundry","Bike storage","24-hour security","Secure door entry","On-site security","CCTV","Sonder Safety App"],
      tenures:[52,44,26,12],
      offers:[
        {kind:"free_weeks", value:3, from:52, label:"3 weeks free on 52-week bookings"},
        {kind:"percent", value:4, label:"Group-booking 4% off"}
      ],
      rooms:[
        {name:"Twin Bunk in 8 Bed Apartment", bed:"Twin bunk", weekly:239},
        {name:"Twin Room in 16 Bed Apartment", bed:"Twin share", weekly:279},
        {name:"6 Bed Apartment", bed:"Shared · own room", weekly:399},
        {name:"5 Bed Apartment", bed:"Shared · own room", weekly:409},
        {name:"4 Bed Apartment", bed:"Shared · own room", weekly:429},
        {name:"Ultra Studio – King Single", bed:"Studio", weekly:569},
        {name:"Ultra Studio – Double Bed", bed:"Studio", weekly:579}
      ],
      amenities:{
        universities:["Queensland University of Technology","University of Queensland","Griffith University","TAFE Queensland"],
        gyms:["On-site Gym","BFT South Brisbane","Dedicated Fitness Southbank","Goodlife Health Clubs West End","Anytime Fitness South Bank"],
        cinemas:["Cinema Room (on-site)","Event Cinemas Myer Centre","South Bank Cineplex"],
        cafes:["Coffee Head Co.","Lisboa Caffe","Cordelia Sourdough Bakehouse"],
        restaurants:["Southside Restaurant","Como Restaurant","Calida Argentinian","Naga Thai","River Quay Fish"],
        parks:["Tribune Street Park","Musgrave Park","South Bank Parklands"],
        supermarkets:["IGA Local Grocer South Brisbane","Woolworths Metro Fish Lane","EzyMart Grey Street","Woolworths Metro Southpoint","Coles West End"],
        transport:["Dorchester St / Somerville House Stop 5 (bus)","South Bank Busway Platform 4","South Brisbane Station","South Bank Ferry Terminal (CityCat)"],
        libraries:["State Library of Queensland","West End Library"],
        pubs:["Lina Rooftop","The Rose & Crown","The Plough Inn","Goldie's Tavern","Pig 'N' Whistle South Bank"],
        healthcare:["Mater Hospital Brisbane","Mater Private Hospital","South Brisbane Urgent Care Clinic","Mater Hill Family Medical Centre"]
      }
    }
  ]
};
