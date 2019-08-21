$(document).ready(function () {

    function losuj(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // losowanie liczby od 'min' do 'max'
    }



    var a, b, c, pytania = 1;

    var czas = 10;
    var _CZAS = 10.5;
    var timer = 5, _timer = false;

    var start = false;

    function liczby(min, max) {
        a = losuj(min, max); //pierwsza losowa liczba
        b = losuj(2, 9); //druga losowa liczba
        c = losuj(2, 9); //trzecia losowa liczba
    }
    liczby(1, 9);
    var points = 0;


    $tabela = $('#tabela');     // przypisanie $tablea tabeli
    $tryb1 = $('#tryb1');       // przypisanie $tryb1 przycisku trybu1  
    $tryb2 = $('#tryb2');       // przypisanie $tryb2 przycisku trybu2  
    $tryb3 = $('#tryb3');       // przypisanie $tryb3 przycisku trybu3  
    $results = $('#results');   // przypisanie $results rezultatów
    $liczba = $('input#L');     // przypisanie $liczba pola tekstowego
    $ok = $('input#OK');        // przypisanie $ok przycisku 'Prześlij'
    $p = $('#wartosc');         // przypisanie $p paragrafu
    $pkt = $('#pkt');           // przypisanie $pkt punktów
    $poziom = $('#poziom');     // przypisanie $poziom nazwy poziomu trudności
    zycia = 3;                  // deklaruje 3 życia gracza


    function anim1(value) {
        value.animate({
            opacity: 0.4,
        }, 120);
    }
    /////////////ANIMACJA//////////////
    function anim2(value) {
        value.animate({
            opacity: 1,
        }, 120);
    }

    $tryb1.mouseenter(function () {
        anim1($tryb1);
    });
    $tryb1.mouseleave(function () {
        anim2($tryb1);
    });

    /////////////ANIMACJA//////////////

    $tryb2.mouseenter(function () {
        anim1($tryb2);
    });
    $tryb2.mouseleave(function () {
        anim2($tryb2);
    });

    /////////////ANIMACJA//////////////

    $tryb3.mouseenter(function () {
        anim1($tryb3);
    });
    $tryb3.mouseleave(function () {
        anim2($tryb3);
    });


    $liczba.css({                   // dla liczb wprowadzanych przez użytkownika
        "font-family": "verdena",   // ustawienie czcionki verdena
        "font-size": "24pt"
    });      // ustawienie wielkości czcionki na 24 punkty

    $p.css({                        // dla liczb np 5+3+2
        "font-family": "verdena",   // ustawienie czcionki verdena
        "font-size": "24pt"
    });      // ustawienie wielkości czcionki na 24 punkty


    $tryb1.click(function () {
        start = true;
        $tabela.toggle('slow');
        $tryb1.toggle('fast');
        $tryb2.toggle('fast');
        $tryb3.toggle('fast');
        Poziom = poziom.NOWICJUSZ;


    });

    $tryb2.click(function () {
        start = true;
        $tabela.toggle('slow');
        $tryb1.toggle('fast');
        $tryb2.toggle('fast');
        $tryb3.toggle('fast');
        Poziom = poziom.LATWY;
    });

    $tryb3.click(function () {
        start = true;
        $tabela.toggle('slow');
        $tryb1.toggle('fast');
        $tryb2.toggle('fast');
        $tryb3.toggle('fast');
        Poziom = poziom.SREDNI;
    });

    function game1() {
        liczby(1, 9);
    }
    function game2() {
        liczby(1, 20);
    }
    function game3() {
        liczby(1, 25);
    }


    $tabela.toggle();

    var poziom = {
        NOWICJUSZ: { nazwa: "Dodawanie", znak: "+" },    // tworzy poziom nowicjusza ze znakiem dodania
        LATWY: { nazwa: "Odejmowanie", znak: "-" },            // tworzy poziom łatwy, z odejmowaniem
        SREDNI: { nazwa: "Mnożenie", znak: "*" },          // tworzy poziom średni, z mnożeniem
        TRUDNY: { nazwa: "Trudny", znak: "/" }          // tworzy poziom trudny, który nie jest używany
    }
    var Poziom = poziom.NOWICJUSZ;
    function wygrana() {
        points++;
        pytania++;
        $liczba.val(""); // usuwa liczby z boxa
        var xa = Math.round(10 - czas);
        $results.html('Odpowiedziałes poprawnie!' + " czas: " + xa + "s");
        console.log('Poprawna odpowiedź to ' + wynik);

        if (points < 10)
            game1();
        else if (points >= 10 && points < 20) {
            game2();
        }
        else if (points >= 20) {
            game3();
        }
        $poziom.css("background-color", "green"); // zmiana koloru na zielony po wygranej turze
        if (zycia > 0)
            czas = _CZAS;
        if (pytania >= 15) {
            stop();
        }

    }

    function stop() {
        $('.wrap, a').toggleClass('active');
        _timer = true;

        $ok.prop("disabled", true);//wyłączenie przycisku przy przegranej
        start = false;
        $('#wiadomosc').html("Zakończyłeś grę z wynikiem " + points + ", z pozostałymi " + zycia + " życiami.");
        $('.wrap').css("background-image", "url(img/smerf.jpg)");
    }

    function przegrana() {

        zycia--;
        $liczba.val("");
        var xa = Math.round(10 - czas);
        $results.html('Poprawna odpowiedź to ' + wynik + " czas: " + xa + "s");
        console.log('Poprawna odpowiedź to ' + wynik);

        $poziom.css("background-color", "red"); // zmiana koloru na czerwony po przegranej turze
        if (zycia > 0)
            czas = _CZAS;
        if (points < 10)
            game1();
        if (points >= 10)
            game2();
        if (points >= 20)
            game3();
        if (pytania >= 15) {
            stop();
        }
        pytania++;
        if (zycia <= 0) {
            $('.wrap, a').toggleClass('active');
            _timer = true;
            $('#wiadomosc').html('Przegrałeś grę z wynikiem ' + points + " punktów, na poziomie " + Poziom.nazwa + "!\nAby zagrać ponownie, odśwież stronę.");
            $('.wrap').css("background-image", "url(img/gargamel.jpg)");
        }
    }



    $liczba.keyup(function (e) { // jezeli w boxie użytkownik kliknie enter, działa to jak przycisk poniżej
        if (zycia > 0 && start) {
            if (e.keyCode == 13) { //enter przy boxie
                $ok.click(); // poniższa funkcja
            }
        }

    });



    $ok.on('click', function () {
        if ($liczba.val() == wynik) {
            wygrana();
        }
        else {
            przegrana();
        }
    });



    setInterval(function () {
        if (zycia > 0 && start) {
            if (czas >= 0)
                czas -= 1 / 60; // odejmuje 1 od zmiennej czas co sekundę
            if (czas < 0) {
                czas = 0;
                przegrana();
            }
        }

        if (_timer == true) {
            timer -= 1 / 60;
        }
        if (timer <= 0 && _timer == true) {
            $('.wrap, a').toggleClass('active');
            _timer = false;
            timer = 5;

        }

        $pkt.html(" Punkty: " + points + "\nCzas: " + Math.round(czas)); // aktualizacja pola Punkty
        $p.html(a + " + " + b + " " + Poziom.znak + " " + c + " ="); // aktualizacja pola z liczbami
        if (Poziom == poziom.NOWICJUSZ) {
            wynik = a + b + c; // np 5 + 4 + 3
        }
        else if (Poziom == poziom.LATWY) {
            wynik = a + b - c; // np 5 + 4 - 3
        }
        else if (Poziom == poziom.SREDNI) {
            wynik = (b * c) + a; // np 5 + 4 * 3
        }
        else if (Poziom == poziom.TRUDNY) {
            wynik = Math.round((b / c) + a); // Słabo działa np 5 + 2 / 9
        }
        $poziom.html("Pytanie: " + pytania + ", poziom " + '"' + Poziom.nazwa + '",' + " życia: " + zycia);

        if (zycia <= 0 || start == false) {
            $ok.prop("disabled", true);//wyłączenie przycisku przy przegranej

        }
        else if (zycia >= 0 || start == true) {
            $ok.prop("disabled", false);//włączenie, jeżeli żyje
        }


    }, 1000 / 60);

});

