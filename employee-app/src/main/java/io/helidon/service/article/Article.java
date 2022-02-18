package io.helidon.service.article;

import io.helidon.service.employee.Employee;

import javax.json.bind.annotation.JsonbCreator;
import javax.json.bind.annotation.JsonbProperty;
import java.util.UUID;

public final class Article {

    private final String id;
    private final String title;
    private final String body;
    private final String userId;

    private Article(String id, String title, String body, String userId) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.userId = userId;
    }

    @JsonbCreator
    @SuppressWarnings("checkstyle:ParameterNumber")
    public static Article of(@JsonbProperty("id") String id, @JsonbProperty("title") String title,
                              @JsonbProperty("body") String body, @JsonbProperty("userId") String userId) {
        if (id == null || id.trim().equals("")) {
            id = UUID.randomUUID().toString();
        }
        Article a = new Article(id, title, body, userId);
        return a;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getUserId() {
        return userId;
    }

    @Override
    public String toString() {
        return "Article{" +
                "'id':'" + id + "'" +
                ", title='" + title + "'" +
                ", 'body':'" + body + "'" +
                ", 'userId':'" + userId + "'" +
                '}';
    }
}
