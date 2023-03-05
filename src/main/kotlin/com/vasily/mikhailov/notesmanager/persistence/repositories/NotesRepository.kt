package com.vasily.mikhailov.notesmanager.persistence.repositories

import com.vasily.mikhailov.notesmanager.persistence.entities.Note
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface NotesRepository : JpaRepository<Note, Long> {
    @Query(value = "SELECT SUM(LENGTH(note.body))/COUNT(*) FROM Note note")
    fun getAverageCharactersNumberInNotes(): Long

    @Query(value = "SELECT note.createDatetime from Note note ORDER BY note.createDatetime LIMIT 1")
    fun getFirstNoteDatetime(): LocalDateTime

    @Query(value = "SELECT MAX(LENGTH(note.body)) FROM Note note")
    fun getCharactersNumberInLongestNote(): Long
}