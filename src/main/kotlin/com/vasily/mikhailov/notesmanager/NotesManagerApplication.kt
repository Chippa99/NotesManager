package com.vasily.mikhailov.notesmanager

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NotesManagerApplication

fun main(args: Array<String>) {
	runApplication<NotesManagerApplication>(*args)
}
