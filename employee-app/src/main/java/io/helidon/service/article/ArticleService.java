package io.helidon.service.article;

import io.helidon.config.Config;
import io.helidon.service.employee.Employee;
import io.helidon.service.employee.EmployeeRepository;
import io.helidon.service.employee.EmployeeService;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.logging.Logger;

public class ArticleService implements Service {

    private static final Logger LOGGER = Logger.getLogger(EmployeeService.class.getName());

    public ArticleService(Config config) {

    }

    /**
     * A service registers itself by updating the routine rules.
     * @param rules the routing rules.
     */
    @Override
    public void update(Routing.Rules rules) {
        rules.get("/", this::getAll)
                .post("/", this::save);
    }

    private void getAll(final ServerRequest request, final ServerResponse response) {
        LOGGER.fine("getAll");


        try {
            // Get 10th record data
            URL getUrl = new URL("https://jsonplaceholder.typicode.com/posts/");
            HttpURLConnection conection = (HttpURLConnection) getUrl.openConnection();

            // Set request method
            conection.setRequestMethod("GET");

            // Getting response code
            int responseCode = conection.getResponseCode();

            // If responseCode is 200 means we get data successfully
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(conection.getInputStream()));
                StringBuffer jsonResponseData = new StringBuffer();
                String readLine = null;

                // Append response line by line
                while ((readLine = in.readLine()) != null) {
                    jsonResponseData.append(readLine);
                }

                in.close();

                response.send(jsonResponseData.toString());
            } else {
                System.out.println(responseCode);
            }
        } catch (final IOException e) {

            response.send("error");
        }
    }

    private void save(ServerRequest request, ServerResponse response) {
        LOGGER.fine("save");

        request.content()
                .as(Article.class)
                .thenApply(a -> Article.of(null,
                        a.getTitle(),
                        a.getBody(),
                        a.getUserId()))
                .thenCompose(this::saveArticle)
                .thenAccept(it -> response.status(201).send());
    }

    private CompletionStage<Article> saveArticle(final Article article) {

        try {
            // Get 10th record data
            URL getUrl = new URL("https://jsonplaceholder.typicode.com/posts/");
            HttpURLConnection conection = (HttpURLConnection) getUrl.openConnection();

            // Set request method
            conection.setRequestMethod("POST");
            conection.setRequestProperty("Content-Type", "application/json; utf-8");

            // Getting response code
            int responseCode = conection.getResponseCode();

            try(OutputStream os = conection.getOutputStream()) {
                byte[] input = article.toString().getBytes("utf-8");
                os.write(input, 0, input.length);
            }
        } catch (final IOException e) {

        }
        return CompletableFuture.completedFuture(article);
    }
}
