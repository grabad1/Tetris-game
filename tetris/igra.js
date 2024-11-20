$(document).ready(function () {
    let score = 0
    let level
    let lines = 0
    kraj = 0
    let time = parseInt(sessionStorage.getItem('nivo'))
    imena = sessionStorage.getItem('imena').split(',')
    rezs = sessionStorage.getItem('rez').split(',')
    if (time == 1000) {
        startlevel = 1
    }
    else {
        if (time == 800) {
            startlevel = 5
        }
        else {
            startlevel = 10
        }
    }
    level = startlevel
    $("#score h4").html(score)
    $("#lines h4").html(lines)
    $("#level h4").html(level)
    const tab = document.querySelector('.tab')
    squares = Array.from(document.querySelectorAll('.tab div'))
    const width = 10
    const ltet = [[1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]]

    const rtet = [[1, width + 1, width * 2 + 1, width * 3 + 1], [width, width + 1, width + 2, width + 3], [1, width + 1, width * 2 + 1, width * 3 + 1], [width, width + 1, width + 2, width + 3]]

    const stet = [[0, 1, width, width + 1], [0, 1, width, width + 1], [0, 1, width, width + 1], [0, 1, width, width + 1]]

    const ttet = [[1, width, width + 1, width + 2], [1, width + 1, 2 * width + 1, width + 2], [width, width + 1, width + 2, width * 2 + 1], [1, width + 1, width * 2 + 1, width]]

    const ztet = [[width * 2, width * 2 + 1, width + 1, width + 2], [0, width, width + 1, width * 2 + 1], [width * 2, width * 2 + 1, width + 1, width + 2], [0, width, width + 1, width * 2 + 1]]

    const lntet = [[0, 1, width + 1, width * 2 + 1], [width * 2, width * 2 + 1, width * 2 + 2, width + 2], [1, width + 1, width * 2 + 1, width * 2 + 2], [width, width + 1, width + 2, width * 2]]

    const zntet = [[width, width + 1, width * 2 + 1, width * 2 + 2], [2, width + 2, width + 1, width * 2 + 1], [width, width + 1, width * 2 + 1, width * 2 + 2], [2, width + 2, width + 1, width * 2 + 1]]

    const allpieces = [rtet, ltet, lntet, stet, ttet, zntet, ztet]
    let pieces = []
    niz = sessionStorage.getItem('oblici').split(',')
    niz.forEach(e => {
        pieces.push(allpieces[parseInt(e)])
    })
    console.log(pieces.length)
    let piece = Math.floor(Math.random() * pieces.length)
    let curPos = 4
    let currot = 0
    let cur = pieces[piece][currot]
    let piecen = Math.floor(Math.random() * pieces.length)
    let next = pieces[piecen]
    function draw() {
        cur.forEach(i => {
            squares[curPos + i].classList.add('active')
        })
    }
    function nexttocur() {
        for (i = 0; i < pieces.length; i++) {
            if (pieces[i] == next) {
                cur = pieces[i][0]
            }
        }
    }

    function undraw() {
        cur.forEach(i => {
            squares[curPos + i].classList.remove('active')
        })
    }
    function stop() {
        if (cur.some(i => squares[curPos + i + width].classList.contains('zauzet'))) {
            cur.forEach(i => squares[curPos + i].classList.add('zauzet'))
            undraw()
            curPos = 4
            currot = 0
            cur = pieces[piecen][0]
            piece = piecen
            linije()
            draw()
            piecen = Math.floor(Math.random() * pieces.length)
            next = pieces[piecen]
            nextf()
            end()
        }
        dle = 1

    }
    function end() {
        if (cur.some(i => squares[i + curPos].classList.contains('zauzet'))) {
            cur = 0
            clearInterval(t)
            if (!kraj) {
                alert("IGRA JE GOTOVA")
                nm = prompt('Unesite ime:')
                while(nm==""){
                    nm=prompt('Niste uneli uneli ime. Unesite ime:')
                }
                imena.push(nm)
                rezs.push(Math.floor(score))
                for (i = 1; i < rezs.length - 1; i++) {
                    for (j = i; j < rezs.length; j++) {
                        if (i + 1 < rezs.length) {
                            if (rezs[i] < rezs[j]) {
                                pomi = imena[i]
                                pomr = rezs[i]
                                rezs[i] = rezs[j]
                                imena[i] = imena[j]
                                imena[j] = pomi
                                rezs[j] = pomr
                            }
                        }
                    }
                }
                sessionStorage.setItem('rez', rezs)
                sessionStorage.setItem('imena', imena)
                sessionStorage.setItem('ostvarenirez', score)
                sessionStorage.setItem('ostvareniime', nm)
                window.location.href = "tetris-rezultati.html"
                kraj = 1
            }
        }
    }
    dle = 1
    function dole(flag) {
        if (flag) {
            dle = 0
            setTimeout(stop, time / 4)
        }
        else {
            stop()
        }
        undraw()
        curPos += width
        cur = pieces[piece][currot]
        draw()
    }
    function rotate() {
        undraw()
        c = currot
        currot = (currot + 1) % 4
        cur = pieces[piece][currot]
        islevo = cur.some(i => (curPos + i) % width < 3)
        isdesno = cur.some(i => (curPos + i) % width > 7)
        if (cur.some(i => squares[curPos + i].classList.contains('zauzet')) || (islevo && isdesno)) {
            currot = c
            cur = pieces[piece][currot]
        }
        draw()
    }
    function levo() {
        setTimeout(stop,time/4)
        undraw()
        islevo = cur.some(i => (curPos + i) % width == 0)
        if (!islevo) { curPos -= 1 }
        if (cur.some(i => squares[curPos + i].classList.contains('zauzet'))) {
            curPos += 1
        }
        draw()
    }
    function desno() {
        setTimeout(stop,time/4);
        undraw()
        isdesno = cur.some(i => (curPos + i) % width == 9)
        if (!isdesno) { curPos += 1 }
        if (cur.some(i => squares[curPos + i].classList.contains('zauzet'))) {
            curPos -= 1
        }
        draw()
    }
    $(document).keypress(function (e) {
        switch (e.keyCode) {
            case 115:
                if (1) {
                    stop()
                    clearInterval(t)
                    dole(0)
                    t=setInterval(dole,time)
                }
                break
            case 100:
                desno()
                break
            case 97:
                levo()
                break
            case 13:
                rotate()
                break
        }
    });
    function linije() {
        let sc = 0
        for (i = 190; i > 0; i -= 10) {
            f = 0
            for (j = 0; j < 10; j++) {
                if (!(squares[i + j].classList.contains('zauzet'))) {
                    f = 1
                }
            }
            if (f == 0) {
                for (j = 0; j < 10; j++) {
                    squares[j + i].classList.remove('zauzet')
                }
                for (j = i - 10; j > 0; j -= 10) {
                    for (h = 0; h < 10; h++) {
                        if (squares[j + h].classList.contains('zauzet')) {
                            squares[j + h].classList.remove('zauzet')
                            squares[j + h + 10].classList.add('zauzet')
                        }
                    }
                }
                i += 10
                lines += 1
                if (sc == 0) {
                    sc = 100
                }
                else {
                    sc = Math.floor(sc * 2.2)
                }
            }
        }
        score += sc
        level = Math.ceil(score / 350) + startlevel
        time = 1000 - (level - 1) * 50
        $("#score h4").html(Math.floor(score))
        $("#lines h4").html(lines)
        $("#level h4").html(level)
        clearInterval(t)
        t = setInterval(function () { dole(1); }, time)
    }
    function brisi() {
        document.getElementById('0').classList.remove('active')
        document.getElementById('1').classList.remove('active')
        document.getElementById('2').classList.remove('active')
        document.getElementById('3').classList.remove('active')
        document.getElementById('4').classList.remove('active')
        document.getElementById('5').classList.remove('active')
        document.getElementById('6').classList.remove('active')
        document.getElementById('7').classList.remove('active')
    }
    function nextf() {
        switch (next) {
            case rtet:
                brisi()
                document.getElementById('4').classList.add('active')
                document.getElementById('5').classList.add('active')
                document.getElementById('6').classList.add('active')
                document.getElementById('7').classList.add('active')
                break
            case ztet:
                brisi()
                document.getElementById('1').classList.add('active')
                document.getElementById('2').classList.add('active')
                document.getElementById('4').classList.add('active')
                document.getElementById('5').classList.add('active')
                break
            case zntet:
                brisi()
                document.getElementById('0').classList.add('active')
                document.getElementById('1').classList.add('active')
                document.getElementById('5').classList.add('active')
                document.getElementById('6').classList.add('active')
                break

            case lntet:
                brisi()
                document.getElementById('0').classList.add('active')
                document.getElementById('1').classList.add('active')
                document.getElementById('2').classList.add('active')
                document.getElementById('4').classList.add('active')
                break

            case ltet:
                brisi()
                document.getElementById('0').classList.add('active')
                document.getElementById('4').classList.add('active')
                document.getElementById('5').classList.add('active')
                document.getElementById('6').classList.add('active')
                break

            case ttet:
                brisi()
                document.getElementById('1').classList.add('active')
                document.getElementById('6').classList.add('active')
                document.getElementById('4').classList.add('active')
                document.getElementById('5').classList.add('active')
                break

            case stet:
                brisi()
                document.getElementById('0').classList.add('active')
                document.getElementById('1').classList.add('active')
                document.getElementById('4').classList.add('active')
                document.getElementById('5').classList.add('active')
                break
        }
    }
    draw()
    nextf()
    t = setInterval(function () { dole(1); }, time)
});
