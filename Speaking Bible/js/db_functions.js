// create and Populate the database
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id unique, s_title,title)');
    tx.executeSql('DROP TABLE CHAPTERS');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CHAPTERS (id unique,book_s_title,chapter_no,url)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS VERSES (order_no,book_s_title,verse_no,verse_start,chapter_text,verse_text,chapter_no,book,paragraph)');
}

function createBooks(tx) {
    tx.executeSql('SELECT * FROM BOOKS', [], querySuccessBooks, errorCB);
}

function createChapters(tx) {
    tx.executeSql('SELECT * FROM CHAPTERS', [], querySuccessChapters, errorCB);
}

function createVerses(tx){
    tx.executeSql('SELECT * FROM VERSES', [], querySuccessVerses, errorCB);
}

function querySuccessVerses(tx, results) {
    var len = results.rows.length;
    if (len == 0)
    {
        verseCreation(tx);
    }

}

function querySuccessChapters(tx, results) {
    var len = results.rows.length;
    if (len == 0)
    {
        create_chapters(tx);
    }
    createVerses(tx);
}

function querySuccessBooks(tx, results) {

    var len = results.rows.length;
    if (len == 0)
    {

        create_books(tx);
    }
    createChapters(tx);
}


// Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

// Transaction success callback
function successCB() {
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(createBooks, errorCB);
    // alert("success");

}