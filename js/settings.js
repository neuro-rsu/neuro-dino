const pdb = new PouchDB('dino-settings');

export let settings;

export const defaultSettings = {
    lesson: {
        number: 1,
        name: "Прыжки",
    },
    topic: {
        number: 1,
        name: "Прыжок через большой кактус"
    },
    topology: [1,2],
    populationCount: 10,
    cloud: {
        distance: {
            min: 20,
            max: 218,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false,
    },
    cactus: {
        distance: {
            min: 100,
            max: 100,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false,
    },

    bigCactus: {
        distance: {
            min: 100,
            max: 100,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false
    },

    smallCactus: {
        distance: {
            min: 100,
            max: 100,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false
    },

    twoCactus: {
        distance: {
            min: 100,
            max: 100,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false
    },

    threeCactus: {
        distance: {
            min: 100,
            max: 100,
        },
        top: {
            min: 10,
            max: 100,
        },
        hidden: false
    },


    ground: {
        distance: {
            min: 3,
            max: 15,
        },
        top: {
            min: 442,
            max: 451,
        },
        hidden: false,
    },

    bumps: {
        distance: {
            min: 40,
            max: 100,
        },
        top: {
            min: 442,
            max: 451,
        },
        hidden: false,
    },

    pterodactyl: {
        distance: {
            min: 100,
            max: 500,
        },
        top: {
            min: 10,
            max: 351,
        },
        hidden: false,
    },

    moon: {
        distance: {
            min: 100,
            max: 500,
        },
        top: {
            min: 20,
            max: 120,
        },
        hidden: false,
    },

    star: {
        distance: {
            min: 100,
            max: 500,
        },
        top: {
            min: 70,
            max: 200,
        },
        hidden: false,
    },

    night: {
        distance: {
            min: 400,
            max: 400,
        },
        top: {
            min: 100,
            max: 100,
        },
        hidden: false,
    },
    horizon: {
        hidden: false,
    },
    user: {
        username: "",
    },
    connection: {
        host: "http://localhost",
        port: "5984",
    },
    theme: 'light',
}

export function compactSettings() {
    pdb.compact();
}

export function destroySettings() {
    pdb.destroy();
}

export async function loadSettings() {
    settings = JSON.parse(JSON.stringify(defaultSettings));
    settings._id = getSettingsID();
    await get()
}

export async function get() {
    await pdb.get(getSettingsID()).then(settingsDB =>
        settings = settingsDB
    ).catch(function (err) {
        create();
    });
}

export function copyDefault() {
    settings = {_id: settings._id, _rev: settings._rev, ...defaultSettings};
}

export async function save() {
    await pdb.put(settings).then( settingsDB => {
        settings._rev = settingsDB.rev;
    }).catch( err => {
        console.log(`Can't create settings: ${err}`);
    });
}

function getSettingsID() {
    return `${settings.lesson.number.toString()}.${settings.topic.number.toString()}:${settings.topology.join('-')}.${settings.populationCount.toString()}`;
}

export async function create() {
    settings = JSON.parse(JSON.stringify(defaultSettings));
    settings._id = getSettingsID();

    await pdb.put(settings).then( settingsDB => {
        settings._rev = settingsDB.rev;
    }).catch( err => {
        console.log(`Can't create settings: ${err}`);
    });
}