/* @ Christoph - wie lösen wir das mit der category-color, einfach mit einem RGB Code/ Hexcode ?? Wär glaub ich am einfachsten 
    danach mit classList arbeiten - 
    @ Yusuf dasselbe bei den contacts oder?*/


let tasks = [
    {
        "title": "Einkaufen",
        "discription": "Ich muss heute noch einkaufen",
        "category": "Lebensmittel",
        "category-color": "#000000",
        "contacts": [
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": 1678127322623,
        "prio": 1,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": ['Banane', 'Apfel', 'Limo', 'Kaffee', 'Pizza'],
        "subtasks-value": [0, 0, 0, 0, 0],
        "status": "toDo"
    },
    {
        "title": "Wäsche waschen",
        "discription": "Die Waschmaschine und der Trockner müssen heute noch glühen. Achtung bei der Temperatur-Einstellung nicht das die Hose nicht mehr passt :D",
        "category": "Hausarbeit",
        "category-color": "#3983AB",
        "contacts": [
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            },
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            },
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": 1678127322623,
        "prio": 2,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": ["Wäsche in die Waschmaschine", "Wäsche in den Trockner", "Wäsche zusammenlegen"],
        "subtasks-value": [0, 0, 0],
        "status": "toProgress"
    },
    {
        "title": "Meeting",
        "discription": "Keine Ahnung",
        "category": "Arbeit",
        "category-color": "#DFAC1F",
        "contacts": [
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": 1678127322623,
        "prio": 3,
        "subtasks": [],
        "subtasks-value": [],
        "status": "awaitingFeedback"
    },
    {
        "title": "Coding",
        "discription": "Übe in der Developer Akademie noch ein bisschen besser",
        "category": "Weiterbildung",
        "category-color": "#1EB8D7",
        "contacts": [
            {
                "name": "Max Mustermann",
                "initials": "MM",
                "color": "#47965F"
            }
        ],
        "date": 1678127322623,
        "prio": 1,
        "subtasks": [],
        "subtasks-value": [],
        "status": "done"
    },
    {
        "title": "Rasenmähen",
        "discription": "Im Garten gehört der Rasen noch gemäht!",
        "category": "Hausarbeit",
        "category-color": "#3983AB",
        "contacts": [
            {
                "name": "Denise Ruhmanseder",
                "initials": "DR",
                "color": "#EEF31A"
            },
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": 1678127322623,
        "prio": 3,
        "subtasks": ['Unkraut zupfen', 'Rasenmähen'],
        "subtasks-value": [0, 0,],
        "status": "toProgress"
    },
    {
        "title": "zum Sport gehen",
        "discription": "Sport ist gesund",
        "category": "Freizeit",
        "category-color": "#0063C0",
        "contacts": [
            {
                "name": "Denise Ruhmanseder",
                "initials": "DR",
                "color": "#EEF31A"
            }
        ],
        "date": 1678127322623,
        "prio": 2,
        "subtasks": [],
        "subtasks-value": [],
        "status": "awaitingFeedback"
    },
    {
        "title": "Kochen",
        "discription": "Ich muss heute noch was gutes Kochen",
        "category": "Lebensmittel",
        "category-color": "#000000",
        "contacts": [
            {
                "name": "Mama Ruhmanseder",
                "initials": "MR",
                "color": "#DC3A63"
            }
        ],
        "date": 1678127322623,
        "prio": 1,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": ['Banane', 'Apfel', 'Limo', 'Kaffee', 'Pizza'],
        "subtasks-value": [0, 0, 0, 0, 0],
        "status": "awaitingFeedback"
    },
    {
        "title": "Nothing",
        "discription": "Do Nothing",
        "category": "Lebensmittel",
        "category-color": "#000000",
        "contacts": [
            {
                "name": "Tobias Ruhmanseder",
                "initials": "TR",
                "color": "#7AE229"
            }
        ],
        "date": 1678127322623,
        "prio": 1,  /* 1 = Urgent  2 = Medium  3= Low - please put this text to the function witch prio uses */
        "subtasks": [],
        "subtasks-value": [],
        "status": "toDo"
    }
]

