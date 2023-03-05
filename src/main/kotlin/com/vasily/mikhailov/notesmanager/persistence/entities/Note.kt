package com.vasily.mikhailov.notesmanager.persistence.entities

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "notes", indexes = [Index(columnList = "create_datetime")])
data class Note(
        @Id
        @Column(name = "id", nullable = false, updatable = false, columnDefinition = "bigint")
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        var id: Long? = null,

        @Column(name = "subject", nullable = false)
        var subject: String,

        @Column(name = "body", nullable = false)
        var body: String,

        @Column(name = "create_datetime", nullable = false)
        var createDatetime: LocalDateTime = LocalDateTime.now(),

        @Column(name = "image_link", nullable = true)
        val imageLink: String? = null
) {
    constructor() : this(subject = "subj", body = "body")
}
