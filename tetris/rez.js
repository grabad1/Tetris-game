$(document).ready(function () {
    console.log(sessionStorage.getItem('imena'))
    console.log(sessionStorage.getItem('rez'))
    imena = sessionStorage.getItem('imena').split(',')
    rez = sessionStorage.getItem('rez').split(',')
    ostvime = sessionStorage.getItem('ostvareniime')
    ostvsc = sessionStorage.getItem('ostvarenirez')
    if (ostvime) {
        $("#ostv").html(ostvime)
        $("#ostvsc").html(ostvsc)
    }
    sessionStorage.removeItem('ostvareniime')
    sessionStorage.removeItem('ostvarenirez')
    flag=1
    for (i = 1; i < rez.length; i++) {
        $("#" + i).html(imena[i])
        $("#sc" + i).html(rez[i])
        if (i>1){
            if (rez[i]==rez[i-1]){
                $("#rb"+i).html($("#rb"+(i-1)).html())
            }
        }
        if (ostvime && flag){
            if (rez[i]<=ostvsc){
                $("#rb").html(i+'.')
                flag=0
            }
        }
    }
})