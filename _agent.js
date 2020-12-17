// enumerate all Java classes
function enumAllClasses() {
    var allClasses = [];
    var classes = Java.enumerateLoadedClassesSync();

    classes.forEach(function (aClass) {
        try {
            var className = aClass.match(/[L](.*);/)[1].replace(/\//g, ".");
            send(className);
        }
        catch (err) { } // avoid TypeError: cannot read property 1 of null
        allClasses.push(className);
    });

    return allClasses;
}

if (Java.available) {
    // Wait until MainActivity is available
    setTimeout(function () {
        Java.perform(function () {
            // Your hooks go here.
            enumAllClasses()
        })
    }, 1000)
} else {
    console.log("Java not found");
}
