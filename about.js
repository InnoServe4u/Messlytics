
function loadImpactData() {
    database.ref("messData").on("value", function (snapshot) {

        let totalWaste = 0
        let totalPrepared = 0
        let mealsSaved = 0

        snapshot.forEach(function (child) {

            const data = child.val()

            const prepared = Number(data.prepared)
            const waste = Number(data.waste)

            totalPrepared += prepared
            totalWaste += waste

        })

        const wasteReduced = Math.floor(totalPrepared - totalWaste)

        // assumptions
        const peopleFed = Math.floor(totalWaste / 0.5)   // 0.5 kg per meal
        const co2Saved = (wasteReduced * 2.5).toFixed(0) // emission factor
        mealsSaved = peopleFed
        const treesSaved = Math.floor(co2Saved / 21)
        const carKmSaved = Math.floor(co2Saved * 4)
        mealsImpact = peopleFed
        //1 tree absorbs= approx 21kg CO2 per year
        //1km driving =approx 0.25kg CO2


        // update numbers

        animateCounter("mealsSaved", mealsSaved)
        animateCounter("wasteReduced", wasteReduced)
        animateCounter("co2Saved", co2Saved)
        animateCounter("peopleFed", peopleFed)
        animateCounter("treesSaved", treesSaved)
        animateCounter("carKmSaved", carKmSaved)
        animateCounter("mealsImpact", mealsImpact)




    })
}
loadImpactData()
function animateCounter(id, target) {

    const element = document.getElementById(id)

    let start = 0
    const duration = 1500
    const stepTime = 30
    const increment = target / (duration / stepTime)
    const timer = setInterval(function () {
        start += increment

        if (start >= target) {
            element.innerText = target
            clearInterval(timer)
        } else {
            element.innerText = Math.floor(start)
        }

    }, stepTime)

}
let counterStarted = false

window.addEventListener("scroll", function () {

    const section = document.getElementById("impactSection")
    const position = section.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (position < screenPosition && !counterStarted) {

        counterStarted = true
        loadImpactData()

    }

})









