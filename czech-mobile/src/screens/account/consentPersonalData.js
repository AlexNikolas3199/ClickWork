import React from 'react'
import { View, SafeAreaView, StyleSheet, Text, ScrollView, Linking } from 'react-native'
import MainButton from '../../components/MainButton'
import { THEME } from '../../utils/theme'

const ConsentPersonalData = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.flex}>
                <Text style={[styles.text, styles.center]}>
                    ZÁSADY OCHRANY OSOBNÍCH ÚDAJŮ SPOLEČNOSTI ARTWORK APPLICATION A.S.
                </Text>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. I.</Text>
                    <Text style={styles.h2}>Úvodní ustanovení</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Společnost ARTWORK APPLICATION A.S.,</Text> IČ:
                        28378571, se sídlem Moulíkova 3285/1a, Smíchov, 150 00 Praha 5, zapsaná v
                        obchodním rejstříku vedeném Městským soudem v Praze, oddíl B, vložka
                        14209/MSPH (dále také jen jako „My“), jako správce osobních údajů, Vás jako
                        našeho zákazníka, dodavatele apod. informuje o níže popsaném shromažďování
                        osobních údajů a zásadách ochrany soukromí.
                    </Text>
                </View>

                <View style={styles.margin}>
                    <Text style={styles.text}>Dále v textu se dozvíte zejména:</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        1. Jaké druhy informací a osobních údajů získáváme;
                    </Text>
                    <Text style={styles.text}>
                        2. Pro jaké účely a jakým způsobem budeme Vaše osobní údaje zpracovávat;
                    </Text>
                    <Text style={styles.text}>
                        3. Jak nakládáme s Vašimi osobními údaji a informacemi a komu mohou být Vaše
                        osobní údaje předány;
                    </Text>
                    <Text style={styles.text}>
                        4. Po jakou dobu budeme Vaše osobní údaje zpracovávat;
                    </Text>
                    <Text style={styles.text}>
                        5. Jaké jsou Vaše práva týkající se Vašich osobních údajů a informací.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        V případě, že budete potřebovat kteroukoliv část těchto zásad ochrany
                        osobních údajů vysvětlit, poradit anebo projednat další zpracování Vašich
                        osobních údajů, můžete se na nás kdykoliv obrátit na emailové adrese{' '}
                        <Text
                            onPress={() => Linking.openURL('mailto:klikwork@seznam.cz')}
                            style={styles.link}
                        >
                            klikwork@seznam.cz
                        </Text>
                    </Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. II.</Text>
                    <Text style={styles.h2}>Rozsah zpracování osobních údajů</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Informace a osobní údaje získáváme primárně pro účely řízení naší činnosti a
                        vztahů s Vámi – zákazníky, dodavateli apod. Informace můžeme získávat i pro
                        účely naplnění legislativních požadavků, zdokonalování námi poskytovaných
                        produktů nebo služeb, jakož i v zájmu vyřešení právních a/nebo obchodních
                        záležitostí nebo sporů.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Pokud vstupujete do interakce se společností{' '}
                        <Text style={styles.bold}>ARTWORK APPLICATION A.S.,</Text>
                        můžeme vás požádat o určité údaje.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Když se na nás obracíte, obecně můžete být požádáni o sdělení/vyplnění
                        určitých údajů o sobě. Těmito údaji mohou být zejména:
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>a{')'} Vaše jméno a příjmení,</Text>
                    <Text style={styles.text}>b{')'} adresa bydliště,</Text>
                    <Text style={styles.text}>c{')'} telefonní číslo,</Text>
                    <Text style={styles.text}>d{')'} emailová adresa,</Text>
                    <Text style={styles.text}>e{')'} případně jiné identifikační údaje.</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Údaje se obecně získávají přímo od Vás jako jednotlivce prostřednictvím
                        elektronických prostředků, jako je internetová stránka, formuláře a e-maily
                        nebo prostřednictvím telefonických hovorů s Vámi, případně jinými způsoby
                        komunikace (včetně komunikace na sociálních sítích Facebook, Instagram a
                        dalších). Někdy Vás můžeme požádat, abyste nám poskytli informace, a to
                        zejména v případech, kdy nahlašujete problémy s našimi službami nebo když
                        Vás žádáme o vyplnění průzkumů, dotazníků a poskytnutí písemné zpětné vazby,
                        které používáme za účelem monitorování kvality a na výzkumné účely.
                        Samozřejmě máte právo zvolit si, zda nám poskytnete osobní údaje a umožníte
                        nám identifikovat Vás. Pokud se však rozhodnete neposkytnout nám osobní
                        údaje, které od Vás požadujeme, je možné, že Vám nebudeme schopni poskytnout
                        služby, které od nás žádáte.{' '}
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        V závislosti na možnostech, které jste zvolili ohledně nastavení na
                        stránkách různých sociálních sítí a nastavení na našich stránkách, mohou být
                        také se společností{' '}
                        <Text style={styles.bold}>ARTWORK APPLICATION A.S.</Text> sdíleny určité
                        osobní údaje o vašich aktivitách online a profilech na sociálních sítích
                        (např. zájmy, rodinný stav, pohlaví, uživatelské jméno, fotografie,
                        komentáře, které jste zveřejnili apod.).{' '}
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Kromě toho můžeme také prostřednictvím souborů cookie nebo podobných postupů
                        shromažďovat osobní údaje, které mimo jiné zahrnují:
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>● vaši IP adresu,</Text>
                    <Text style={styles.text}>● vaše ID souborů cookie, </Text>
                    <Text style={styles.text}>● váš webový prohlížeč,</Text>
                    <Text style={styles.text}>● vaše umístění, </Text>
                    <Text style={styles.text}>
                        ● webové stránky, které navštěvujete na našem webu,
                    </Text>
                    <Text style={styles.text}>
                        ● reklamy, které jste shlédli nebo jste na ně kliknuli,
                    </Text>
                    <Text style={styles.text}>● apod. </Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. III.</Text>
                    <Text style={styles.h2}>Účel zpracování</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Údaje, které nám poskytujete, používáme předně k tomu, abychom plnili
                        smlouvy uzavřené s Vámi, případně abychom Vás kontaktovali zpět a poskytli
                        Vám informace, o které jste nás požádali. Veškeré osobní údaje jsou
                        zpracovány zákonným a transparentním způsobem a jsou vyžadovány pouze
                        přiměřené, relevantní a nezbytné údaje ve vztahu k výše uvedenému účelu
                        zpracování. Vaše jméno, příjmení, adresu bydliště, telefonní číslo nebo
                        emailovou adresu, případně jiné Vaše identifikační údaje můžeme vedle toho
                        využít k tomu, abychom Vám zasílali obchodní sdělení, avšak výhradně na
                        základě Vámi výslovně uděleného souhlasu, tj. abychom Vás informovali o
                        událostech, publikacích, zboží nebo službách, které poskytujeme a které by
                        Vás mohly zajímat. Naše společnost si zakládá na tom, že bez Vašeho
                        svobodného souhlasu od nás nebudete dostávat marketingová obchodní sdělení.
                        Poskytnutí osobních údajů pro účely plnění smlouvy a poskytnutí osobních
                        údajů pro účely odpovědi na Vámi vznesené dotazy nebo Vámi požadované
                        informace jsou naším smluvním požadavkem, a jejich neposkytnutí může být
                        důsledkem neuzavření smlouvy nebo neposkytnutí odpovědi na Vámi vznesené
                        dotazy.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Vedle toho zpracování Vašich osobních údajů za účelem zasílání obchodních
                        sdělení můžete kdykoliv odmítnout a nebude to mít vliv na naše jiné vzájemné
                        vztahy. Stačí nám zaslat e-mail s příslušnou žádostí, ze které jste od nás
                        obdržel/a obchodní sdělení.
                    </Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. IV.</Text>
                    <Text style={styles.h2}>Kdo má k Vašim osobním údajům přístup</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Zaručujeme Vám bezpečnost nakládání s Vašimi osobními údaji a informacemi,
                        zamezení neoprávněnému přístupu k nim a jejich neoprávněnému poskytnutí a
                        máme zavedené materiální, technické a organizační postupy na zabezpečení
                        jejich ochrany. Všechny poskytnuté údaje jsou uloženy v zabezpečeném a
                        přiměřeném systému nebo archívu, který zodpovídá obchodním a zpracovatelským
                        potřebám. Údaje jsou uloženy v elektronické nebo papírové podobě, přičemž v
                        každém případě byly zavedeny záruky za účelem ochrany osobních údajů a
                        informací před ztrátou, zneužitím nebo neoprávněným přístupem.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Vaše osobní údaje budeme jako správce zpracovávat My. Vaše osobní údaje
                        můžeme za výše uvedenými účely předat našim subdodavatelům, aby pro nás
                        provedli jejich zpracování. Naše společnost si pečlivě vybrala své
                        subdodavatele a uzavřela s nimi příslušné smlouvy o zpracování osobních
                        údajů, aby zabezpečila přiměřenou úroveň ochrany osobních údajů.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={[styles.text, styles.bold]}>Osobní údaje mohou být předány: </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>- naší externí účetní a daňové společnosti, </Text>
                    <Text style={styles.text}>
                        - naší externí IT společnosti, která nám poskytuje serverové, webové,
                        cloudové a další IT služby,
                    </Text>
                    <Text style={styles.text}>- našemu externímu právnímu poradci. </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Ve vztahu k Vám a k ochraně osobních údajů naše společnost vykonává veškeré
                        povinnosti a práva, která je z hlediska ochrany osobních údajů pro Vás
                        kontaktním místem.
                    </Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. V.</Text>
                    <Text style={styles.h2}>Doba zpracování osobních údajů</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Vaše osobní údaje budeme zpracovávat po dobu, po kterou Vám budeme
                        poskytovat naše zboží a služby či plnit vzájemnou smlouvu, nebo po dobu
                        nezbytnou k plnění archivačních povinností podle platných právních předpisů,
                        jako jsou například zákon č. 563/1991 Sb., o účetnictví, zákon č. 499/2004
                        Sb., o archivnictví a spisové službě, zákon č. 133/2000 Sb., o evidenci
                        obyvatel a rodných číslech, nebo zákon č. 235/2004 Sb., o dani z přidané
                        hodnoty. Po skončení plnění naší vzájemné smlouvy a po uplynutí zákonných
                        archivačních lhůt Vaše osobní údaje bezpečně a důkladně zlikvidujeme, a to
                        jak ty listinné, tak elektronické.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Snažíme se uchovávat jen takové informace, které jsou přesné, aktuální a
                        relevantní. Pokud si myslíte, že Vaše osobní údaje, které o Vás
                        zpracováváme, jsou nesprávné, neváhejte nás kontaktovat prostřednictvím
                        dostupných kanálů, abychom učinili příslušné kroky na nápravu.
                    </Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. VI.</Text>
                    <Text style={styles.h2}>Používání cookies</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Naše webové stránky ukládají v souladu se zákony na Vaše zařízení soubory,
                        obecně nazývané jako cookies. Cookies jsou malé datové soubory, díky kterým
                        si navštívené webové stránky pamatují vaše úkony a nastavení, které jste na
                        nich provedli, takže tyto údaje nemusíte zadávat opakovaně. Cookies
                        nepředstavují nebezpečí, mají však význam pro ochranu soukromí. Cookies
                        nelze použít pro zjištění totožnosti návštěvníků stránek ani ke zneužití
                        přihlašovacích údajů. Ukládají se do nich Vaše přihlašovací údaje, údaje o
                        nastavení, která používáte na naších stránkách. Dále používáme cookies
                        třetích stran pro analýzu návštěvnosti (např. Google Analytics). Tyto
                        cookies jsou řízeny třetími stranami a nemáme přístup ke čtení nebo zápisu
                        těchto dat. Většina prohlížečů cookies automaticky akceptuje, pokud není
                        prohlížeč nastaven jinak. Používáním našich webových stránek souhlasíte s
                        ukládáním souborů cookies. Použití cookies můžete kdykoliv omezit nebo
                        zablokovat v nastavení svého webového prohlížeče.
                    </Text>
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={styles.h2}>Čl. VII.</Text>
                    <Text style={styles.h2}>Vaše práva plynoucí ze zpracování osobních údajů</Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Ve vztahu k námi prováděnému zpracování Vašich osobních údajů máte
                        následující práva:
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>a{')'} právo na přístup k osobním údajům;</Text>
                    <Text style={styles.text}>b{')'} právo na opravu osobních údajů;</Text>
                    <Text style={styles.text}>
                        c{')'} právo na výmaz osobních údajů („právo být zapomenut“);
                    </Text>
                    <Text style={styles.text}>
                        d{')'} právo na omezení zpracování osobních údajů;
                    </Text>
                    <Text style={styles.text}>e{')'} právo na přenositelnost osobních údajů;</Text>
                    <Text style={styles.text}>
                        f{')'} právo vznést námitku proti zpracování osobních údajů;
                    </Text>
                    <Text style={styles.text}>
                        g{')'} právo podat stížnost na zpracování osobních údajů.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Vaše práva jsou níže vysvětlena, abyste si dokázal/a udělat jasnější
                        představu o jejich obsahu.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Všechna Vaše práva můžete uplatnit tak, že nás kontaktujete na emailové
                        adrese{' '}
                        <Text
                            onPress={() => Linking.openURL('mailto:klikwork@seznam.cz')}
                            style={styles.link}
                        >
                            klikwork@seznam.cz
                        </Text>
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Stížnost můžete podat u dozorového úřadu</Text>,
                        kterým je Úřad pro ochranu osobních údajů {'('}
                        <Text onPress={() => Linking.openURL('http:uoou.cz')} style={styles.link}>
                            www.uoou.cz
                        </Text>
                        {')'}.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Právo na přístup k osobním údajům</Text> znamená,
                        že si kdykoliv můžete požádat o naše potvrzení, zda osobní údaje, které se
                        Vás týkají, jsou či nejsou zpracovávány, a pokud jsou, pak za jakými účely,
                        v jakém rozsahu, komu jsou zpřístupněny, jak dlouho je budeme zpracovávat,
                        zda máte právo na opravu, výmaz, omezení zpracování či vznést námitku, odkud
                        jsme osobní údaje získali a zda dochází na základě zpracování Vašich
                        osobních údajů k automatickému rozhodování, včetně případného profilování.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Také máte právo získat kopii Vašich osobních údajů, přičemž první poskytnutí
                        je bezplatné, za další poskytnutí pak můžeme požadovat přiměřenou úhradu
                        administrativních nákladů.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Právo na opravu osobních údajů </Text> znamená, že
                        nás kdykoliv můžete požádat o opravu či doplnění Vašich osobních údajů,
                        pokud by byly nepřesné či neúplné.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Právo na výmaz osobních údajů</Text>, což znamená,
                        že musíme vymazat Vaše osobní údaje pokud:
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        {'('}i{')'} již nejsou potřebné pro účely, pro které byly shromážděny nebo
                        jinak zpracovány,
                    </Text>
                    <Text style={styles.text}>
                        {'('}ii{')'} odvoláte souhlas a neexistuje žádný další důvod pro zpracování,
                    </Text>
                    <Text style={styles.text}>
                        {'('}iii{')'} vznesete námitky proti zpracování a neexistují žádné
                        převažující oprávněné důvody pro zpracování,
                    </Text>
                    <Text style={styles.text}>
                        {'('}iv{')'} zpracování je protiprávní nebo
                    </Text>
                    <Text style={styles.text}>
                        {'('}v{')'} to ukládá zákonná povinnost.{' '}
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Právo na omezení zpracování osobních údajů</Text>,
                        což znamená, že dokud se nevyřeší sporné otázky ohledně zpracování Vašich
                        osobních údajů, konkrétně pokud:
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        {'('}i{')'} popíráte přesnost osobních údajů,
                    </Text>
                    <Text style={styles.text}>
                        {'('}ii{')'} zpracování je protiprávní, ale místo výmazu osobních údajů
                        chcete jejich zpracování pouze omezit,
                    </Text>
                    <Text style={styles.text}>
                        {'('}iii{')'} Vaše osobní údaje již nepotřebujeme pro účely zpracování, ale
                        Vy ano,
                    </Text>
                    <Text style={styles.text}>
                        {'('}iv{')'} nebo pokud Vámi byla vznesena námitka proti zpracování, viz
                        dále.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        V takovém případě můžeme mít Osobní údaje pouze uloženy a další zpracování
                        je podmíněno Vaším souhlasem, případně tím, že tyto údaje jsou potřeba z
                        důvodu určení, výkonu nebo obhajoby právních nároků.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Právo na přenositelnost osobních údajů</Text>, což
                        znamená, že máte právo získat Vaše osobní údaje, které jste nám poskytl se
                        souhlasem ke zpracování nebo pro účely plnění smlouvy, ve strukturovaném,
                        běžně používaném a strojově čitelném formátu, a, je-li to technicky
                        proveditelné, máte právo, abychom tyto údaje předali Vašemu jinému správci.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>
                            Právo vznést námitku proti zpravování osobních údajů
                        </Text>
                        , což znamená, že můžete u nás podat písemnou či elektronickou námitku proti
                        zpracování svých osobních údajů, čímž způsobíte, že Vaše osobní údaje
                        nebudeme dále zpracovávat, pokud neprokážeme závažné oprávněné důvody pro
                        zpracování, které převažují nad Vašimi zájmy nebo právy a svobodami.
                    </Text>
                </View>
                <View style={styles.margin}>
                    <Text style={styles.text}>
                        Tyto Zásady ochrany osobních údajů jsou účinné od 25.05.2021.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <MainButton title="OK" onPress={() => navigation.goBack()} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        paddingHorizontal: 15
    },
    text: {
        width: '100%',
        fontSize: 16
    },
    margin: { marginVertical: 10 },
    center: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 20
    },
    h2: {
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    bold: { fontWeight: 'bold' },
    link: { color: THEME.MAIN_COLOR, fontSize: 16, textDecorationLine: 'underline' },
    buttonWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        borderColor: THEME.MAIN_COLOR,
        borderTopWidth: 2
    }
})

export default ConsentPersonalData
