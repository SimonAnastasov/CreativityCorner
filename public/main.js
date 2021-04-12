const socket = io.connect();
const media = window.matchMedia('(max-width: 800px)'); // if (media.matches) width < 800px

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// ? _util functions
function addElement(parentId, elementTag, elementId, html) {
    const parent = document.getElementById(parentId)
    const newElement = document.createElement(elementTag)
    if (elementId != '') newElement.setAttribute('id', elementId)
    newElement.innerHTML = html
    parent.appendChild(newElement)
}

function removeElement(elementId) {
    const element = document.getElementById(elementId)
    element.parentNode.removeChild(element)
}

function getRnd(min, max) {
    return Math.random() * (max - min) + min
}

function genSongInfo(id = "songX", name, infocode, mins, secs, src) {
    let txt = "";
    const nameLen = name.length;
    txt += '{id: "' + id + '", name: "' + name + id + '", infocode: "' + infocode + '", mins: ' + mins + ', secs: ' + secs + ', src: "' + src + '", nameLen: ' + nameLen + ', lyrics: "none"},';
    console.log(txt);

    // * infocode:
    //      ic[0] = (0 for original, 1 for cover)
    //      ic[1] = (0 for instrumental, 1 for singing)
    //      ic[2] = (0 for guitar, 1 for piano, 2 for both)
    //      ic[3] = (o for simon, 1 for evgenija, 2 for both)
}
// e.g. genSongInfo('song21', 'Jar Of Hearts [Christina Perri]', '1122', 3, 19, './audio/bcsb-JarOfHeartsNew.m4a');

const LAST_SONG_ID = 66;

const allSongs = [
    {id: "song66", name: "Earth [Sleeping At Last]song66", infocode: "1110", mins: 3, secs: 40, src: "../audio/scsp-Earth.m4a", nameLen: 24, lyrics: "none"},
    {id: "song65", name: "A Human That Makes Mistakessong65", infocode: "0100", mins: 1, secs: 41, src: "../audio/sosg-AHumanThatMakesMistakes.m4a", nameLen: 27, lyrics: "none"},
    {id: "song64", name: "Fightsong64", infocode: "0111", mins: 4, secs: 2, src: "../audio/eosp-Fight.m4a", nameLen: 5, lyrics: "none"},
    {id: "song63", name: "A Special Morningsong63", infocode: "0110", mins: 2, secs: 31, src: "../audio/sosp-ASpecialMorning.m4a", nameLen: 17, lyrics: "none"},
    {id: "song62", name: "Opportunitysong62", infocode: "0100", mins: 2, secs: 39, src: "../audio/sosg-Opportunity.m4a", nameLen: 11, lyrics: "none"},
    {id: "song61", name: "Driver's License [Olivia Rodrigo]song61", infocode: "1110", mins: 3, secs: 38, src: "../audio/scsp-DriversLicense.m4a", nameLen: 33, lyrics: "none"},
    {id: "song60", name: "I'm Glad I Found Yousong60", infocode: "0100", mins: 1, secs: 58, src: "../audio/sosg-ImGladIFoundYou.m4a", nameLen: 20, lyrics: "none"},
    {id: "song59", name: "I'll Keep You Safe [Sleeping At Last]song59", infocode: "1110", mins: 3, secs: 56, src: "../audio/scsp-KeepYouSafe.m4a", nameLen: 37, lyrics: "none"},
    {id: "song58", name: "Twice Upon A Timesong58", infocode: "0110", mins: 2, secs: 13, src: "../audio/sosp-TwiceUponATime.m4a", nameLen: 17, lyrics: "none"},
    {id: "song57", name: "Wishessong57", infocode: "0110", mins: 2, secs: 17, src: "../audio/sosp-Wishes.m4a", nameLen: 6, lyrics: "none"},
    {id: "song56", name: "Mountainsong56", infocode: "0010", mins: 2, secs: 12, src: "../audio/soip-Mountain.m4a", nameLen: 8, lyrics: "none"},
    {id: "song54", name: "Magical Momentssong54", infocode: "0100", mins: 2, secs: 9, src: "../audio/sosg-MagicalMoments.m4a", nameLen: 15, lyrics: "none"},
    {id: "song53", name: "Wintersong53", infocode: "0011", mins: 1, secs: 36, src: "../audio/eoip-WinterNew.m4a", nameLen: 6, lyrics: "none"},
    {id: "song52", name: "Feel The Lightsong52", infocode: "0101", mins: 1, secs: 47, src: "../audio/eosg-FeelTheLight.m4a", nameLen: 14, lyrics: "none"},
    {id: "song51", name: "Lifesong51", infocode: "0110", mins: 3, secs: 22, src: "../audio/sosp-Life.m4a", nameLen: 4, lyrics: "none"},
    {id: "song50", name: "Concert 18.12.2020 🥳 (50th Upload)song50", infocode: "0012", mins: 11, secs: 54, src: "../audio/boip-Concert_18-12-2020.m4a", nameLen: 35, lyrics: "none"},
    {id: "song48", name: "Limitlesssong48", infocode: "0100", mins: 3, secs: 38, src: "../audio/sosg-Limitless.m4a", nameLen: 9, lyrics: "none"},
    {id: "song46", name: "Surprisessong46", infocode: "0110", mins: 1, secs: 54, src: "../audio/sosp-Surprises.mp3", nameLen: 9, lyrics: "none"},
    {id: "song45", name: "Golden Leaves [Passenger]song45", infocode: "1100", mins: 3, secs: 27, src: "../audio/scsg-GoldenLeaves.m4a", nameLen: 25, lyrics: "none"},
    {id: "song44", name: "Before You Go [Lewis Capaldi]song44", infocode: "1111", mins: 3, secs: 28, src: "../audio/ecsp-BeforeYouGo.m4a", nameLen: 29, lyrics: "none"},
    {id: "song43", name: "Mistletoe [Justin Bieber]song43", infocode: "1101", mins: 3, secs: 7, src: "../audio/ecsg-Mistletoe.m4a", nameLen: 25, lyrics: "none"},
    {id: "song41", name: "Sign Of The Times [Harry Styles]song41", infocode: "1111", mins: 4, secs: 42, src: "../audio/ecsp-SignOfTheTimes.m4a", nameLen: 32, lyrics: "none"},
    {id: "song40", name: "Love Yourselfsong40", infocode: "0100", mins: 2, secs: 44, src: "../audio/sosg-LoveYourself.m4a", nameLen: 13, lyrics: "none"},
    {id: "song39", name: "Two [Sleeping At Last]song39", infocode: "1100", mins: 3, secs: 36, src: "../audio/scsg-Two.m4a", nameLen: 22, lyrics: "none"},
    {id: "song38", name: "Silent Nightsong38", infocode: "1101", mins: 3, secs: 27, src: "../audio/ecsg-SilentNight.m4a", nameLen: 12, lyrics: "none"},
    {id: "song37", name: "Improvisationssong37", infocode: "0010", mins: 2, secs: 20, src: "../audio/soip-Improvisations.mp3", nameLen: 14, lyrics: "none"},
    {id: "song35", name: "Let Her Go [Passenger]song35", infocode: "1102", mins: 3, secs: 55, src: "../audio/bcsg-LetHerGo.m4a", nameLen: 22, lyrics: "none"},
    {id: "song33", name: "Photograph [Ed Sheeran]song33", infocode: "1122", mins: 3, secs: 56, src: "../audio/bcsb-Photograph.m4a", nameLen: 23, lyrics: "none"},
    {id: "song31", name: "Hopesong31", infocode: "0101", mins: 2, secs: 32, src: "../audio/eosg-HopeNew.m4a", nameLen: 4, lyrics: "none"},
    {id: "song30", name: "Concert 19.10.2020song30", infocode: "0012", mins: 3, secs: 16, src: "../audio/bosp-Concert_19-10-2020.m4a", nameLen: 18, lyrics: "none"},
    {id: "song26", name: "About This Girlsong26", infocode: "0100", mins: 3, secs: 22, src: "../audio/sosg-AboutThisGirlNew.m4a", nameLen: 15, lyrics: "none"},
    {id: "song27", name: "Go Forwardsong27", infocode: "0100", mins: 4, secs: 0, src: "../audio/sosg-GoForward.m4a", nameLen: 10, lyrics: "none"},
    {id: "song25", name: "Ice Creamsong25", infocode: "0010", mins: 2, secs: 48, src: "../audio/soip-IceCream.m4a", nameLen: 9, lyrics: "none"},
    {id: "song24", name: "Beautiful Birds [Passenger]song24", infocode: "1122", mins: 2, secs: 52, src: "../audio/bcsb-BeautifulBirds.m4a", nameLen: 27, lyrics: "none"},
    {id: "song23", name: "Bella Ciaosong23", infocode: "1111", mins: 2, secs: 15, src: "../audio/ecsp-BellaCiaoNew.m4a", nameLen: 10, lyrics: "none"},
    {id: "song22", name: "Quarantinesong22", infocode: "0011", mins: 1, secs: 0, src: "../audio/eoip-Quarantine.m4a", nameLen: 10, lyrics: "none"},
    {id: "song21", name: "Jar Of Hearts [Christina Perri]song21", infocode: "1122", mins: 3, secs: 29, src: "../audio/bcsb-JarOfHeartsNew.m4a", nameLen: 31, lyrics: "none"},
    {id: "song19", name: "Try [Pink]song19", infocode: "1101", mins: 1, secs: 48, src: "../audio/ecsg-Try.m4a", nameLen: 10, lyrics: "none"},
    {id: "song15", name: "Iraesong15", infocode: "0011", mins: 2, secs: 1, src: "../audio/eoip-Irae.m4a", nameLen: 4, lyrics: "none"},
    {id: "song14", name: "Hall Of Hellsong14", infocode: "0011", mins: 2, secs: 17, src: "../audio/eoip-HallOfHell.m4a", nameLen: 12, lyrics: "none"},
    {id: "song13", name: "Annihilationsong13", infocode: "0011", mins: 1, secs: 5, src: "../audio/eoip-Annihilation.m4a", nameLen: 12, lyrics: "none"},
    {id: "song12", name: "Astrumsong12", infocode: "0011", mins: 0, secs: 56, src: "../audio/eoip-Astrum.m4a", nameLen: 6, lyrics: "none"},
    {id: "song11", name: "Heart's Tracesong11", infocode: "0011", mins: 2, secs: 31, src: "../audio/eoip-HeartsTrace.m4a", nameLen: 13, lyrics: "none"},
    {id: "song10", name: "Always Remember Us This Way [Lady Gaga]song10", infocode: "1111", mins: 2, secs: 27, src: "../audio/ecsp-AlwaysRememberUsThisWay.m4a", nameLen: 39, lyrics: "none"},
    {id: "song6", name: "Emiriasong6", infocode: "0010", mins: 1, secs: 3, src: "../audio/soip-GiftInEm.m4a", nameLen: 6, lyrics: "none"},
    {id: "song4", name: "Hi :)song4", infocode: "0010", mins: 1, secs: 45, src: "../audio/soip-Hi.m4a", nameLen: 5, lyrics: "none"},
    {id: "song2", name: "Aiterkastersong2", infocode: "0010", mins: 2, secs: 24, src: "../audio/soip-Aiterkaster.m4a", nameLen: 11, lyrics: "none"},
];

const TOTAL_SONGS = allSongs.length;

const sortinfoAll = [
    {label: "No sorting.", ordercode: 'x'},
    {label: "All songs.", ordercode: 'x'},
]

const sortinfoAuthors = [
    {label: 'Sorted by: Authors.', ordercode: 3},
    {label: "Simon's songs.", ordercode: '0'},
    {label: "Evs's songs.", ordercode: '1'},
    {label: "Sims & Evs's songs.", ordercode: '2'},
]

const sortinfoInstruments = [
    {label: 'Sorted by: Instruments.', ordercode: 2},
    {label: "Guitar songs.", ordercode: '0'},
    {label: "Piano songs.", ordercode: '1'},
    {label: "Guitar & Piano songs.", ordercode: '2'},
]

const sortinfoOriginality = [
    {label: 'Sorted by: Originality.', ordercode: 0},
    {label: "Original songs.", ordercode: '0'},
    {label: "Cover songs.", ordercode: '1'},
]

const sortinfoVocals = [
    {label: 'Sorted by: Vocals.', ordercode: 1},
    {label: "Instrumental songs.", ordercode: '0'},
    {label: "Lyrical songs.", ordercode: '1'},
]

function addClassesToCircles(c1, c2, c3, c4, infocode) {
    const e1 = $('#'+c1);
    const e2 = $('#'+c2);
    const e3 = $('#'+c3);
    const e4 = $('#'+c4);
    e1.addClass('originality'+infocode[0]);
    e2.addClass('vocals'+infocode[1]);
    e3.addClass('instrument'+infocode[2]);
    e4.addClass('author'+infocode[3]);
}

function addSongsToDiv(WHICH_DIV, sortinfo) {
    $('#'+WHICH_DIV).empty();

    const baseLabel = sortinfo[0].label;
    const ordercodeidx = sortinfo[0].ordercode;

    let IDX = 0;
    const SORT_LABEL = 'p'+IDX++;
    addElement(WHICH_DIV, 'p', SORT_LABEL, baseLabel);
    // addElement(WHICH_DIV, 'p', SORT_LABEL, 'Test1');

    const ALL_INSTANCES_CONTAINER = 'div'+IDX++;
    addElement(WHICH_DIV, 'div', ALL_INSTANCES_CONTAINER, '');

    let ITERS = 2;
    if (ordercodeidx != 'x') ITERS = sortinfo.length;

    for (let i = 1; i < ITERS; i++) {
        const currentInstance = sortinfo[i];
        const SINGLE_INSTANCE_CONTAINER = 'div'+IDX++;
        addElement(ALL_INSTANCES_CONTAINER, 'div', SINGLE_INSTANCE_CONTAINER, '');

        const SPECIFIC_SORT_LABEL = 'p'+IDX++;
        // addElement(SINGLE_INSTANCE_CONTAINER, 'p', SPECIFIC_SORT_LABEL, 'Phase 1');
        addElement(SINGLE_INSTANCE_CONTAINER, 'p', SPECIFIC_SORT_LABEL, currentInstance.label);

        const ALL_SONGS_CONTAINER = 'div'+IDX++;
        addElement(SINGLE_INSTANCE_CONTAINER, 'div', ALL_SONGS_CONTAINER, '');

        allSongs.forEach(song => {
            if (!(ordercodeidx == 'x') && song.infocode[ordercodeidx] != currentInstance.ordercode) ;
            else {
                const SINGLE_SONG_CONTAINER = 'div'+IDX++;
                addElement(ALL_SONGS_CONTAINER, 'div', SINGLE_SONG_CONTAINER, '');
                
                const SONG_CIRCLES_CONTAINER_1 = 'div'+IDX++;
                const SONG_CIRCLES_CONTAINER_2 = 'div'+IDX++;
                const SONG_CIRCLES_CONTAINER_3 = 'div'+IDX++;
                const SONG_CIRCLES_CONTAINER_4 = 'div'+IDX++;
                const SONG_CIRCLES_CONTAINER_5 = 'div'+IDX++;
                
                addElement(SINGLE_SONG_CONTAINER, 'div', SONG_CIRCLES_CONTAINER_1, '');
                addElement(SONG_CIRCLES_CONTAINER_1, 'div', SONG_CIRCLES_CONTAINER_2, '');
                addElement(SONG_CIRCLES_CONTAINER_2, 'div', SONG_CIRCLES_CONTAINER_3, '');
                addElement(SONG_CIRCLES_CONTAINER_3, 'div', SONG_CIRCLES_CONTAINER_4, '');
                addElement(SONG_CIRCLES_CONTAINER_4, 'div', SONG_CIRCLES_CONTAINER_5, '');

                addClassesToCircles(SONG_CIRCLES_CONTAINER_1, SONG_CIRCLES_CONTAINER_2, SONG_CIRCLES_CONTAINER_3, SONG_CIRCLES_CONTAINER_4, song.infocode);
                
                const ICON = 'i'+IDX++;
                addElement(SONG_CIRCLES_CONTAINER_5, 'i', ICON, '');
                $('#'+ICON).addClass('fas fa-music');
                
                const songTitle = song.name.substr(0, song.nameLen);
                let secsFill = '';
                if (song.secs < 10) secsFill = '0';
                const songDuration = song.mins + ':' + secsFill + song.secs;
                
                const SONG_TITLE_LABEL = 'p'+IDX++;
                const SONG_DURATION_LABEL = 'p'+IDX++;
                
                // addElement(SINGLE_SONG_CONTAINER, 'p', SONG_TITLE_LABEL, 'TTT');
                // addElement(SINGLE_SONG_CONTAINER, 'p', SONG_DURATION_LABEL, 'PPP');
                addElement(SINGLE_SONG_CONTAINER, 'p', SONG_TITLE_LABEL, songTitle);
                addElement(SINGLE_SONG_CONTAINER, 'p', SONG_DURATION_LABEL, songDuration);
            }
        })
    }
}

const MAIN_SONG_CONTAINER = 'mainSongContainer';
addSongsToDiv(MAIN_SONG_CONTAINER, sortinfoAuthors);

