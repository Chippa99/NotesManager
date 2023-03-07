package com.vasily.mikhailov.notesmanager.rest.services

import com.vasily.mikhailov.notesmanager.persistence.entities.Note
import com.vasily.mikhailov.notesmanager.persistence.repositories.NotesRepository
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit

@Service
@Transactional
class NoteService {
    @Autowired
    private lateinit var notesRepository: NotesRepository

    fun getOne(id: Long): Note {
        return notesRepository.getReferenceById(id)
    }

    fun getAll(pageable: Pageable): Page<Note> {
        return notesRepository.findAll(pageable)
    }

    fun getAll(): List<Note> {
        return notesRepository.findAll()
    }

    fun save(note: Note): Note {
        return notesRepository.save(note)
    }

    fun delete(id: Long) {
        notesRepository.deleteById(id)
    }

    fun count(): Long {
        return notesRepository.count()
    }

    fun getAverageCharactersNumberInNotes(): Long {
        return notesRepository.getAverageCharactersNumberInNotes() ?: 0L
    }

    fun getDaysNumberSinceFirstNoteCreation(): Long {
        return ChronoUnit.DAYS.between(
                LocalDateTime.now(),
                notesRepository.getFirstNoteDatetime() ?: LocalDateTime.now()
        )
    }

    fun getCharactersNumberInLongestNote(): Long {
        return notesRepository.getCharactersNumberInLongestNote() ?: 0L
    }
}