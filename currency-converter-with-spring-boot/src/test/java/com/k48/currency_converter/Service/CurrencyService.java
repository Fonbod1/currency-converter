

package com.k48.currency_converter.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.asynchttpclient.AsyncHttpClient;
import org.asynchttpclient.DefaultAsyncHttpClient;
import org.asynchttpclient.Response;
import org.springframework.stereotype.Service;
//import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;


@Service
public class CurrencyService {

    @PostConstruct
    public void init() throws IOException {
        listQuotes(); // Call the method during startup
    }


    public List<String> listQuotes() throws IOException {
        AsyncHttpClient client = new DefaultAsyncHttpClient();
        try {
             Response response = client.prepare("GET", "https://currency-exchange.p.rapidapi.com/listquotes")
                    .setHeader("x-rapidapi-key", "eacd25adc3msh6408671ae2c6058p112b31jsn0ce1af18b8f5")
                    .setHeader("x-rapidapi-host", "currency-exchange.p.rapidapi.com")
                    .execute()
                    .toCompletableFuture()
                   // .thenApply(response -> response.getResponseBody())
                    .join();
             String responseBody = response.getResponseBody();

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(responseBody, List.class);
        } finally {
            client.close();
        }
    }


}
