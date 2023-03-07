package com.vasily.mikhailov.notesmanager.rest.controllers

import com.vasily.mikhailov.notesmanager.persistence.entities.Note
import com.vasily.mikhailov.notesmanager.rest.services.NoteService
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(path = ["api/"])
class NoteController(val noteService: NoteService) {

    companion object {
        val logger = LoggerFactory.getLogger(this::class.java)
    }

    @GetMapping("note/{id}")
    fun getNote(@PathVariable id: Long): Note {
        val note = noteService.getOne(id)
        logger.info("Note $note was received")
        return note
    }

    @PostMapping("note/delete/{id}")
    fun deleteNote(@PathVariable id: Long) {
        noteService.delete(id)
        logger.info("Note with id: $id was deleted")
    }

    @PostMapping("note/save")
    fun saveNote(@RequestBody note: Note) {
        logger.info("Note $note was parsed")
        noteService.save(note)
        logger.info("Note $note was saved")
    }

    @PostMapping("note/update")
    fun updateNote(@RequestBody note: Note) {
        noteService.save(note)
        logger.info("Note $note was updated")
    }

    @GetMapping("notes")
    fun getNotes(): List<Note> {
        val notes = noteService.getAll()
        logger.info("Notes $notes have been sent")
        return notes
    }

    @GetMapping("notes/count")
    fun getNotesCount(): Long {
        val count = noteService.count()
        logger.info("Notes count: $count have been sent")
        return count
    }

    @GetMapping("notes/page")
    fun getNotesPage(@RequestParam("offset") offset: Int ,
                     @RequestParam("limit") limit: Int): Page<Note> {
        val page = noteService.getAll(PageRequest.of(offset, limit, Sort.by("id")))
        logger.info("Page with notes $page have been sent")
        return page
    }

    @GetMapping("notes/max")
    fun getMaxChars(): Long {
        val max = noteService.getCharactersNumberInLongestNote()
        logger.info("Max chars $max have been sent")
        return max
    }

    @GetMapping("notes/average")
    fun getAverageChars(): Long {
        val average = noteService.getAverageCharactersNumberInNotes()
        logger.info("Average chars $average have been sent")
        return average
    }

    @GetMapping("notes/days")
    fun getDaysSinceFirstNote(): Long {
        val days = noteService.getDaysNumberSinceFirstNoteCreation()
        logger.info("Days $days have been sent")
        return days
    }
}