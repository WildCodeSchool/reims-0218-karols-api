"use strict"

module.exports.id = "CREATE-RESOURCES"

const allResources = [
  {
    city: "Paris",
    name: "SALARIE-A",
    quantity: 2,
    prestaTypes: [
      {
        type: "MAQ_ULTIME",
        duration: { minutes: 45 }
      },
      {
        type: "MAQ_FOCUS",
        duration: { minutes: 20 }
      },
      {
        type: "MAQ_KAROLS",
        duration: { minutes: 30 }
      },
      {
        type: "VERNIS",
        duration: { minutes: 10 }
      },
      {
        type: "COIF_STYL",
        duration: { minutes: 20 }
      },
      {
        type: "COIF_STYL_ELA",
        duration: { minutes: 30 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 9 },
          end: { hours: 12 }
        },
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Paris",
    name: "SALARIE-B",
    quantity: 2,
    prestaTypes: [
      {
        type: "MAQ_KAROLS",
        duration: { minutes: 20 }
      },
      {
        type: "COIF_STYL_TELAB",
        duration: { minutes: 45 }
      },
      {
        type: "COUP_CLASSIQUE",
        duration: { minutes: 20 }
      },
      {
        type: "COUP_TSTYLISEE",
        duration: { minutes: 30 }
      },
      {
        type: "VERNIS_POSE",
        duration: { minutes: 10 }
      },
      {
        type: "HOMME_COUPCOIF",
        duration: { minutes: 20 }
      },
      {
        type: "HOMME_BARBE",
        duration: { minutes: 10 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 9 },
          end: { hours: 12 }
        },
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Paris",
    name: "TABLES",
    quantity: 6,
    prestaTypes: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Lyon",
    name: "SALARIE-A",
    quantity: 2,
    prestaTypes: [
      {
        type: "MAQ_ULTIME",
        duration: { minutes: 45 }
      },
      {
        type: "MAQ_FOCUS",
        duration: { minutes: 20 }
      },
      {
        type: "MAQ_KAROLS",
        duration: { minutes: 30 }
      },
      {
        type: "VERNIS",
        duration: { minutes: 10 }
      },
      {
        type: "COIF_STYL",
        duration: { minutes: 20 }
      },
      {
        type: "COIF_STYL_ELA",
        duration: { minutes: 30 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 9 },
          end: { hours: 12 }
        },
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Lyon",
    name: "SALARIE-B",
    quantity: 2,
    prestaTypes: [
      {
        type: "MAQ_KAROLS",
        duration: { minutes: 20 }
      },
      {
        type: "COIF_STYL_TELAB",
        duration: { minutes: 45 }
      },
      {
        type: "COUP_CLASSIQUE",
        duration: { minutes: 20 }
      },
      {
        type: "COUP_TSTYLISEE",
        duration: { minutes: 30 }
      },
      {
        type: "VERNIS_POSE",
        duration: { minutes: 10 }
      },
      {
        type: "HOMME_COUPCOIF",
        duration: { minutes: 20 }
      },
      {
        type: "HOMME_BARBE",
        duration: { minutes: 10 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 9 },
          end: { hours: 12 }
        },
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Lyon",
    name: "TABLES",
    quantity: 6,
    prestaTypes: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Cannes",
    name: "SALARIE-A",
    quantity: 2,
    prestaTypes: [
      {
        type: "MAQ_ULTIME",
        duration: { minutes: 45 }
      },
      {
        type: "MAQ_FOCUS",
        duration: { minutes: 20 }
      },
      {
        type: "MAQ_KAROLS",
        duration: { minutes: 30 }
      },
      {
        type: "VERNIS",
        duration: { minutes: 10 }
      },
      {
        type: "COIF_STYL",
        duration: { minutes: 20 }
      },
      {
        type: "COIF_STYL_ELA",
        duration: { minutes: 30 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 9 },
          end: { hours: 12 }
        },
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Cannes",
    name: "SALARIE-B",
    quantity: 2,
    prestaTypes: [
      {
        type: "MAQ_KAROLS",
        duration: { minutes: 20 }
      },
      {
        type: "COIF_STYL_TELAB",
        duration: { minutes: 45 }
      },
      {
        type: "COUP_CLASSIQUE",
        duration: { minutes: 20 }
      },
      {
        type: "COUP_TSTYLISEE",
        duration: { minutes: 30 }
      },
      {
        type: "VERNIS_POSE",
        duration: { minutes: 10 }
      },
      {
        type: "HOMME_COUPCOIF",
        duration: { minutes: 20 }
      },
      {
        type: "HOMME_BARBE",
        duration: { minutes: 10 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 9 },
          end: { hours: 12 }
        },
        {
          start: { hours: 14 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  },
  {
    city: "Cannes",
    name: "TABLES",
    quantity: 6,
    prestaTypes: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ],
    week: {
      1: [],
      2: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      3: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      4: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      5: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      6: [
        {
          start: { hours: 18 },
          end: { hours: 22 }
        }
      ],
      7: []
    }
  }
]

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const resources = this.db.collection("resources")

  allResources.forEach(resource => {
    resources.insert(resource, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const resources = this.db.collection("resources")
  resources.remove({}, done)
}
