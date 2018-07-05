const MenuData = {
  ENTRES: {
    text: 'Entres',
    id: 'entres',
    sub: {
      HOT: {
        text: 'Hot Enrtres',
        id: 'hot',
        content: [
          {
            name: 'Club Sandwich Tayne Style',
            description: 'Bakon, meat and some other stuff crammed between two pieces of bread, topped with a caesar salad. A great meal, unless you are a sack.',
            searchable: true
          },
          {
            name: 'Desk Lasangia',
            description: 'If you really want to impress that girl or whatever, this is your go-to.',
            searchable: true
          },
          {
            name: 'Meat Tacos',
            description: 'If you cannot stand the meat, get out of the kitchen.',
            searchable: true
          }
        ]
      },
      COLD: {
        text: 'Cold Enrtres',
        id: 'cold',
        content: [
          {
            name: 'The Tunafish & Garbage Sandwich',
            description: 'Savory, sweet, salty, slimy; A true managarie of flavors.',
            searchable: true
          },
          {
            name: 'The Sack',
            description: 'A bag, sculpted from heel cracklins. What does it con-Tayne? Only those who dare order it will find out.',
            searchable: true
          }
        ]
      }
    }
  },
  APPATIZERS: {
    text: 'Appatizers',
    id: 'appatizers',
    content: [
      {
        name: 'Heel Cracklins',
        description: 'Sometimes crunchy, Sometimes slimy, always suculent. Plase an order now, they go fast.',
        searchable: true
      },
      {
        name: 'Tayne Drop Soup',
        description: 'A creamy broth that goes down real smooth.',
        searchable: true
      }
    ]
  },
  DESERTS: {
    text: 'Deserts',
    id: 'deserts',
    content: [
      {
        name: 'King Size Recees',
        description: 'Not for sharing',
        searchable: true
      }
    ]
  },
  FOUNTAINDRINKS: {
    text: 'Fountain Drinks',
    id: 'fountaindrinks',
    content: [
      {
        name: 'Rippit',
        description: 'Order this if you are a sack.',
        searchable: true
      },
      {
        name: 'Rippit F-bomb',
        description: 'Only for those who are not a sack.',
        searchable: true
      }
    ]
  },
  BEER: {
    text: 'Beer',
    id: 'beer',
    content: [
      {
        name: 'Beer Bong',
        description: 'If you cannot finish this guy in one culp, you are a sack.',
        searchable: true
      }
    ]
  },
  CONTACT: {
    text: 'Contact',
    id: 'contact',
    sub: {
      LOCATIONS: {
        text: 'Locationss',
        id: 'locations',
        content: [
          {
            name: 'Dumpster Bihind Zooks',
            description: 'Ask for Spazz',
            searchable: false
          },
          {
            name: 'Taynee Treat Foot-Truck',
            description: 'Really more of a roack coack.',
            searchable: false
          }
        ],
      },
      CAREERS: {
        text: 'Careers',
        id: 'careers',
        content: [
          {
            name: 'Chrank Crew Associate',
            description: 'Must have strong grip strength and have a stronger stomache',
            searchable: false
          }
        ]
      }
    }
  },
  ABOUT: {
    text: 'About Us',
    id: 'about',
    content: [
      {
        name: 'Like',
        description: 'No but...',
        searchable: false
      }
    ]
  },
  NOTFOUND: {
    text: '404',
    id: 'notfound',
    content: [
      {
        name: 'Can\'t be pushed',
        description: 'And then they were like...',
        searchable: false
      }
    ]
  }
}
function getItemManifest () {
  var manifest = []
  for (var m in MenuData) {
    if (MenuData[m].content !== undefined) {
      for (var i = 0; i < MenuData[m].content.length; i++) {
        if (MenuData[m].content[i].searchable) {
          manifest.push(MenuData[m].content[i])
        }
      }
    }
    if (MenuData[m].sub !== undefined) {
      for (var s in MenuData[m].sub) {
        if (MenuData[m].sub[s].content !== undefined) {
          for (var j = 0; j < MenuData[m].sub[s].content.length; j++) {
            if (MenuData[m].sub[s].content[j].searchable) {
              manifest.push(MenuData[m].sub[s].content[j])
            }
          }
        }
      }
    }
  }
  return manifest
}
const ItemManifest = getItemManifest()
export {MenuData, ItemManifest}
