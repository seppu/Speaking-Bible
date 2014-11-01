// create and Populate the database
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id unique, s_title,title)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CHAPTERS (id unique,book_s_title,chapter_no,url)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS VERSES (order_no,book_s_title,verse_no,verse_start,chapter_text,verse_text,chapter_no,book,paragraph)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CROSSLINKS (book_no,chapter_no,verse_no, cross_book, cross_chapter, cross_verse)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS MEMVERSES (book_no, chapter_no, verse_no)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS RECORDINGS (book_no,chapter_no,verse_no, path)');
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
   // alert("books");
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

function insertCrossLink(tx, book, chapter, verse, cr_book, cr_chapter, cr_verse){
    tx.executeSql('INSERT  INTO CROSSLINKS(book_no, chapter_no, verse_no, cross_book, cross_chapter, cross_verse) VALUES ( :bk, :ch, :vr, :cb, :cc, :cv)',
                  {"bk" : book, "ch" : chapter, "vr" : verse, "cb" : cr_book, "cc" : cr_chapter, "cv" : cr_verse } 
);
}

function deleteCrossLink(tx, book, chapter, verse) {
  t.executeSql("DELETE FROM CROSSLINKS WHERE book_no = ? AND chapter_no = ? AND verse_no = ?", [book, chapter, verse]);
}

function insertMemVerse(tx, book, chapter, verse){
    tx.executeSql('INSERT  INTO MEMVERSES(book_no, chapter_no, verse_no) VALUES ( :bk, :ch, :vr )',
                  {"bk" : book, "ch" : chapter, "vr" : verse});
}

function deleteMemVerse(tx, book, chapter, verse) {
  t.executeSql("DELETE FROM MEMVERSES WHERE book_no = ? AND chapter_no = ? AND verse_no = ?", [book, chapter, verse]);
}

function insertRecording(tx, book, chapter, verse, path){
    tx.executeSql('INSERT INTO RECORDING(book_no, chapter_no, verse_no, path) VALUES ( :bk, :ch, :vr, :pt )',
                  {"bk" : book, "ch" : chapter, "vr" : verse, "pt" : path});
}

function deleteRecording(tx, book, chapter, verse) {
  t.executeSql("DELETE FROM RECORDING WHERE book_no = ? AND chapter_no = ? AND verse_no = ?", [book, chapter, verse]);
}


