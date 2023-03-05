package com.vasily.mikhailov.notesmanager.rest.controllers

import com.vasily.mikhailov.notesmanager.persistence.entities.Note
import com.vasily.mikhailov.notesmanager.rest.services.NoteService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class NoteController(val noteService: NoteService) {

    @GetMapping("note/{id}")
    fun getNote(@PathVariable id: Long): Note {
        return noteService.getOne(id)
    }

    @PostMapping("note/delete/{id}")
    fun deleteNote(@PathVariable id: Long) {
        noteService.delete(id)
    }

    @PostMapping("note/save")
    fun saveNote(note: Note) {
        noteService.save(note)
    }

    @PostMapping("note/update")
    fun updateNote(note: Note) {
        noteService.save(note)
    }

    @GetMapping("notes")
    fun getNotes(): List<Note> {
        return noteService.getAll()
    }

    @GetMapping("notes/count")
    fun getNotesCount(): Long {
        return noteService.count()
    }

    @GetMapping("notes/page")
    fun getNotesPage(pageable: Pageable): Page<Note> {
        return noteService.getAll(pageable)
    }

    @GetMapping("notes/max")
    fun getMaxChars(): Long {
        return noteService.getCharactersNumberInLongestNote()
    }

    @GetMapping("notes/average")
    fun getAverageChars(): Long {
        return noteService.getAverageCharactersNumberInNotes()
    }

    @GetMapping("notes/days")
    fun getDaysSinceFirstNote(): Long {
        return noteService.getDaysNumberSinceFirstNoteCreation()
    }
}