var helpers = {
    categories: ["front-end", "back-end", "data-viz", "full-stack", "general-programming", "workflow"],
    fullName: {
        "front-end" : "Front End",
        "back-end" : "Back End",
        "data-viz" : "Data Visualization",
        "full-stack" : "Full Stack",
        "general-programming" : "General Programming",
        workflow: "Workflow"
    },
    levelArr: ["No Experience", "Beginner", "Experienced Beginner", "Intermediate", "Advanced", "Expert", "Master"],
    compare: (a, b) => a === b,
    toLowerAndNoSpace: (str) => str.replace(/ /gi, "-").toLowerCase()

}

module.exports = helpers;
