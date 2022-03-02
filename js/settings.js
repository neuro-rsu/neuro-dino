const pdb = new PouchDB('settings');

export let settings;

const defaultSettings = {
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
            max: 150,
        },
        hidden: false,
    },
    bigCactus: {
        distance: {
            min: 100,
            max: 150,
        },
        hidden: false
    },
    currentTopology: [1,2],
    dinoPopulationCount: 10,

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
        length: {
            min: 100,
            max: 100,
        },
        hidden: false,
    },
    currentTopology: [1,2],
    dinoPopulationCount: 10,
    horizon: {
        hidden: false,
    },
}

export function compactSettings() {
    pdb.compact().then(function (info) {
        alert("Настройки сжаты");
    }).catch(function (err) {
        alert(err);
    });
}

export function destroySettings() {
    pdb.destroy().then(function () {
        alert("Настройки удалены");
    }).catch(function (err) {
        alert(err);
    })
}

export async function loadSettings() {
    await get()
}

export async function get() {
    await pdb.get(defaultSettings.currentTopology.join('-')).then(function (settingsDB) {
        settings = settingsDB;
    }).catch(function (err) {
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

export async function create() {
    settings = defaultSettings;
    settings._id = defaultSettings.currentTopology.join('-');
    await pdb.put(settings).then( settingsDB => {
        settings._rev = settingsDB.rev;
    }).catch( err => {
        console.log(`Can't create settings: ${err}`);
    });
}
