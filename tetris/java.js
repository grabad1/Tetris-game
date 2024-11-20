$(document).ready(function () {
    ime = []
    scores = []
    if (!sessionStorage.getItem('imena')) {
        console.log('a')
        sessionStorage.setItem('imena', ime)
    }
    if (!sessionStorage.getItem('rez')) {
        console.log('a')
        sessionStorage.setItem('rez', scores)
    }
    $("#igraj").click(function () {
        niz = []

        console.log('a')
        var ele = document.getElementsByName('level');
        sessionStorage.setItem("nivo", "1000")
        for (i = 0; i < ele.length; i++)
            if (ele[i].checked) {
                sessionStorage.removeItem("nivo")
                sessionStorage.setItem("nivo", ele[i].value)
            }

        for (i = 0; i < 7; i++)
            if (document.getElementById("ch" + i).checked)
                niz.push(i)
        sessionStorage.setItem("oblici", niz)
        if (niz.length > 0) {
            window.location.href = "tetris-igra.html"
        }
    }

    )
});
