# M426_Password_Manager

# Projektdokumentation – Passwort Manager (Modul 426)

## Team

**Teamname:** SafetyLast  
**Mitglieder:**
- Jan Helbling – *Product Owner*  
- Patrik Rossetti – *Scrum Master* 
- Mazlum Raimi   
- Kyriakos Amanatidis

---

## Projektübersicht

Im Rahmen des Moduls **M426** wurde ein webbasiertes Passwort-Manager-System entwickelt. Ziel war es, mit modernen Technologien eine sichere Möglichkeit zur Generierung und Verwaltung von Passwörtern bereitzustellen.  
Die Umsetzung erfolgte nach **agilen Prinzipien**, wobei besonderer Wert auf iteratives Vorgehen, kontinuierliche Verbesserungen und enge Zusammenarbeit gelegt wurde.

---

## Technischer Überblick

### Architektur

- **Frontend**: React.js (JavaScript)  
  Zuständig für Benutzeroberfläche und Interaktion

- **Backend**: Spring Boot (Java)  
  Stellt REST-API für Passwortgenerierung und -verwaltung bereit

- **Kommunikation**: HTTP-Requests über Axios

- **Datenhaltung**:  
  In der aktuellen Version werden Passwörter **temporär im Frontend** verwaltet  
  *(optional erweiterbar mit Persistenzlösung)*

- **Security**:  
  Grundkonfiguration mit Spring Security vorbereitet

#### Begründung der Tool-Wahl

Für die Umsetzung unseres Passwort-Managers haben wir bewusst moderne und etablierte Technologien gewählt:

- **React.js** ermöglicht die Entwicklung einer performanten und reaktiven Weboberfläche. Durch die komponentenbasierte Architektur konnten wir die Benutzeroberfläche modular und gut wartbar gestalten. Zudem ist React weit verbreitet und bietet eine große Community sowie zahlreiche Erweiterungsmöglichkeiten.

- **Spring Boot** wurde als Backend-Framework eingesetzt, da es eine einfache und schnelle Entwicklung von REST-APIs in Java ermöglicht. Die Integration von Sicherheitsfeatures wie **Spring Security** ist ebenfalls gut unterstützt. Da einige Teammitglieder bereits Erfahrung mit Java hatten, konnten wir so Synergien im Team nutzen.

- **Axios** haben wir für die Kommunikation zwischen Frontend und Backend gewählt, da es eine schlanke und flexible Bibliothek für HTTP-Requests ist und sich gut in React-Projekte integrieren lässt.

Diese Kombination hat uns erlaubt, eine moderne, zukunftssichere und erweiterbare Architektur aufzubauen, bei der Frontend und Backend klar voneinander getrennt sind. Somit wäre es auch in zukünftigen Versionen problemlos möglich, beispielsweise eine Datenpersistenz mit einer Datenbank hinzuzufügen oder weitere Sicherheitsmechanismen zu integrieren.

- **Datenhaltung**:  
  In der aktuellen Version werden Passwörter **temporär im Frontend** verwaltet  
  *(optional erweiterbar mit Persistenzlösung)*

- **Security**:  
  Grundkonfiguration mit Spring Security vorbereitet

---

## Funktionalitäten

- Generierung sicherer Passwörter (Länge: **16 Zeichen**, inklusive Sonderzeichen)
- Auflistung vorhandener Einträge
- Möglichkeit zur **Bearbeitung und zum Löschen** von Passwörtern
- Benutzerfreundliche Weboberfläche zur Verwaltung
- Vorbereitung für **Authentifizierung** (z. B. Benutzer-Login)

---

## Agile Umsetzung

### Vorgehensweise (Scrum-inspiriert)

- **Product Backlog**  
  Zentrale Anforderungen wurden initial in Form von **User Stories** definiert, z. B.:
  - „Als Nutzer möchte ich ein sicheres Passwort generieren können, damit ich es für meine Online-Konten verwenden kann.“
  - „Als Nutzer möchte ich bestehende Passwörter bearbeiten und löschen können, um meine Übersicht aktuell zu halten.“

- **Sprints**  
  Umsetzung erfolgte in kurzen Iterationen von **1–2 Wochen**

- **Daily Standups** *(fiktiv für Projektdokumentation)*  
  Regelmäßige Absprachen im Team, um Fortschritte und Blocker zu besprechen

- **Sprint Reviews**  
  Nach jeder Iteration wurden Zwischenergebnisse präsentiert und Feedback eingeholt

- **Retrospektiven**  
  Verbesserungspotenziale in Zusammenarbeit, Codequalität und UI-Design wurden laufend identifiziert und umgesetzt

---

## Rollenverteilung (fiktiv)

- **Product Owner (Jan Helbling)**:  
  Zuständig für Priorisierung der Anforderungen und Vision des Produkts

- **Scrum Master (Patrik Rossetti)**:  
  Überwachte die Einhaltung agiler Prinzipien und unterstützte das Team bei der Selbstorganisation

- **Entwicklungsteam**:  
  Mazlum Raimi, Kyriakos Amanatidis – Umsetzung von Frontend und Backend

---

## User-Stories mit Akzeptanzkriterien

- **Als User möchte ich eine Übersichtliche ansicht, um gut zu naviegieren**

- **Als User möchte ich alle gespeicherten Passwörter in einer Übersicht sehen damit ich schnell erkenne, welche Logins ich habe.**
    Akzeptanzkriterien
    - Die „Passwort-Manager“-Seite zeigt alle Einträge (Anwendung, Login, Passwort) in einer Tabelle.
    - Über der Tabelle wird eine Anzahl aller Einträge angezeigt (z. B. „3 Einträge“).
    - Das Layout ist übersichtlich und passt sich verschiedenen Bildschirmgrößen an.

- **Als User möchte ich die Länge meines Passworts vorgeben können damit ich ein schnell generiertes Passwort in passender Länge erhalte.**
    Akzeptanzkriterien
    - Es gibt ein Eingabefeld für die Passwortlänge (z. B. 8–32 Zeichen).
    - Bei Klick auf „Generieren“ zeigt das Programm ein Passwort in dieser Länge an.
    - Bei ungültiger Eingabe (z. B. < 4 Zeichen) erscheint eine Fehlermeldung.

- **Als User möchte ich festlegen, wie viele Sonderzeichen und Zahlen in mein Passwort kommen damit ich ein Passwort mit passender Komplexität erhalte.**
    Akzeptanzkriterien
    - Es gibt ein Radial-Menü um das Passwort zu konfigurieren
        0 keine Zahlen, Sonderzeichen
        1 einige Zahlen, Sonderzeichen
        2 viele Zahlen, Sonderzeichen    
    - Das generierte Passwort enthält genau die gewünschte Menge an Sonderzeichen und Zahlen (sofern möglich).

- **Als User möchte ich meine Einträge anpassen, damit ich bei Änderungen nicht den ganzen Eintrag neu machen muss.**
    Akzeptanzkriterien
    - Der Editier-Modus ist ein Pop-up
    - Im Editier-Modus kann ich die Felder(Webseite/Username/Passwort) anpassen.
    - Der Editier-Modus hat ein Button um die Änderungen zu speichern.
    - Der Editier-Modus hat ein Button um das Fenster wieder zu schliessen.

- **Als User möchte ich gespeicherte Passwörter nach Anwendungsnamen filtern können damit ich in der Liste schnell einen bestimmten Eintrag finde.**
    Akzeptanzkriterien
    - Es gibt ein Suchfeld „Anwendung“.
    - Gebe ich etwas ein, werden nur passende Einträge angezeigt.
    - Leere ich das Suchfeld, sehe ich wieder alle Einträge.

- **Als User möchte ich einen Button haben, mit dem ich das generierte Passwort direkt in die Zwischenablage kopieren kann, damit ich es schnell und ohne Tippfehler weiterverwenden kann.**
    Akzeptanzkriterien
    - Ein „Kopieren“-Button ist sichtbar, sobald ein Passwort generiert wurde.
    - Beim Klick auf den Button wird das aktuelle Passwort in die Zwischenablage kopiert.
    - Nach dem Klick erhält der User eine visuelle Rückmeldung (z. B. ein kurzer Hinweis wie „Passwort kopiert!“).
    - Es wird immer das zuletzt generierte Passwort kopiert – auch wenn es verändert wurde.

- **Als User möchte ich auch im Manager ein neues Passwort (für eine Anwendung) manuell hinzufügen können damit ich bestehende oder externe Passwörter dort speichern kann, ohne den Generator zu nutzen.**
    Akzeptanzkriterien
    - Es gibt im Passwort-Manager einen Button „Neuen Eintrag hinzufügen“.
    - Ein Formular erscheint, in dem ich Anwendungsname, Login und Passwort eingeben kann.
    - Klicke ich auf „Speichern“, wird ein neuer Eintrag in die CSV-Datei geschrieben.
    - Der neue Eintrag taucht sofort in der Tabelle auf.

- **Als User möchte ich das generierte Passwort gleich mit Anwendungsname und Login speichern damit ich es später wiederfinde.** 
    Akzeptanzkriterien
    - Es gibt Felder für „Anwendungsname“ und „Login“.
    - Bei Klick auf „Generieren und Speichern“ wird alles in einer CSV-Datei gesichert.
    - Die CSV-Datei wird direkt aktualisiert.


## Fazit

Die Zusammenarbeit im Team **SafetyLast** verlief insgesamt sehr gut.  
Durch die klare Rollenverteilung und die regelmäßigen Abstimmungen konnten wir unsere Stärken gezielt einsetzen und voneinander profitieren.

Die **Arbeitsaufteilung war ausgewogen** und alle Teammitglieder haben aktiv zum Projekterfolg beigetragen.

Eine kleine Herausforderung stellte der Projektverlauf über einen längeren Zeitraum dar:  
Durch die **langen Pausen zwischen den Sprints** brauchten wir jeweils etwas Zeit, um uns wieder in den aktuellen Stand des Projekts und den Code einzuarbeiten.  
Zusätzlich hatten wir im Team **vereinzelte unerwartete Ausfälle**, die wir jedoch gemeinsam gut kompensieren konnten.

Trotz dieser Umstände konnten wir ein **funktionsfähiges und benutzerfreundliches Produkt** liefern, das unseren definierten Anforderungen entspricht und eine solide Basis für mögliche Erweiterungen in der Zukunft bietet.

