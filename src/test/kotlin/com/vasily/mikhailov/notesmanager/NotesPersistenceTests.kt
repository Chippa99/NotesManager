package com.vasily.mikhailov.notesmanager

import com.vasily.mikhailov.notesmanager.persistence.entities.Note
import com.vasily.mikhailov.notesmanager.persistence.repositories.NotesRepository
import jakarta.transaction.Transactional
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit

//TODO move to embedded postgres
@ActiveProfiles("test")
@SpringBootTest
@Transactional
class NotesPersistenceTests {
	@Autowired
	lateinit var notesRepository: NotesRepository

	@BeforeEach
	fun init() {
		notesRepository.deleteAll()
	}

	@Test
	fun saveNote() {
		val note = Note(subject = "sub", body = "body", imageLink = "link")
		val newNote = notesRepository.save(note)

		assertThat(newNote).usingRecursiveComparison().isEqualTo(note)

		val actualNotesCount = notesRepository.count()
		val expectedNotesCount = 1L
		assertThat(actualNotesCount).isEqualTo(expectedNotesCount)
	}

	@Test
	fun updateNote() {
		val note = Note(subject = "sub1", body = "body1", imageLink = "link1")
		val newNote = notesRepository.save(note).copy(subject = "sub2", body = "body2", imageLink = "link2")

		notesRepository.save(newNote)
		val actualNote = notesRepository.findById(newNote.id!!).get()

		assertThat(newNote).usingRecursiveComparison().isEqualTo(actualNote)
	}

	@Test
	fun deleteNote() {
		val note = Note(subject = "sub1", body = "body1", imageLink = "link")
		val id = notesRepository.save(note).id!!
		var expectedNotesCount = 1L
		assertThat(notesRepository.count()).isEqualTo(expectedNotesCount)

		notesRepository.deleteById(id)
		val actualNotesCount = notesRepository.count()
		expectedNotesCount = 0L
		assertThat(actualNotesCount).isEqualTo(expectedNotesCount)
	}

	@Test
	fun averageNoteAfterSaveAndUpdate() {
		val note = Note(subject = "sub1", body = "body", imageLink = "link")
		val note1 = note.copy(body = "Some text")
		val note2 = note.copy(body = "Some text Some text")
		val note3 = note.copy(body = "Some")
		notesRepository.save(note)
		notesRepository.save(note1)
		notesRepository.save(note2)
		val newNote = notesRepository.save(note3)

		var actualAverage = notesRepository.getAverageCharactersNumberInNotes()
		var expectedAverage = 9L
		assertThat(actualAverage).isEqualTo(expectedAverage)

		notesRepository.save(newNote.copy(body = "New some text"))
		actualAverage = notesRepository.getAverageCharactersNumberInNotes()
		expectedAverage = 11L
		assertThat(actualAverage).isEqualTo(expectedAverage)
	}

	@Test
	fun maxCharactersNote() {
		val note = Note(subject = "sub1", body = "body", imageLink = "link")
		val note1 = note.copy(body = "Some text")
		val note2 = note.copy(body = "Some text Some text")
		val note3 = note.copy(body = "Some")
		notesRepository.save(note)
		notesRepository.save(note1)
		notesRepository.save(note2)
		notesRepository.save(note3)

		val actualAverage = notesRepository.getCharactersNumberInLongestNote()
		val expectedAverage = 19L
		assertThat(actualAverage).isEqualTo(expectedAverage)
	}

	@Test
	fun firstNoteDatetime() {
		val expectedCountDays = 5L
		val note = Note(subject = "sub1", body = "body", imageLink = "link", createDatetime = LocalDateTime.now().minusDays(expectedCountDays))
		val note1 = note.copy(createDatetime = LocalDateTime.now())
		notesRepository.save(note)
		notesRepository.save(note1)

		val actualCountDays = notesRepository.getFirstNoteDatetime()
		assertThat(ChronoUnit.DAYS.between(actualCountDays, LocalDateTime.now())).isEqualTo(expectedCountDays)
	}
}
