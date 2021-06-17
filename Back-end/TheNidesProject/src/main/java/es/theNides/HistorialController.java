package es.theNides;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/historial")
public class HistorialController {

	@CrossOrigin
	@RequestMapping(value = "/fileWrite", method = RequestMethod.POST)
	public @ResponseBody String fileWrite(@RequestBody String texto) throws Exception {
		try {

			String content;
			content = texto;
			System.out.println(texto);
			FileWriter fw = new FileWriter("historial.txt", true);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(content);
			bw.write('\n');
			bw.close();

			return "done";

		} catch (IOException e) {
			System.out.println("Fallo??");
			System.out.println(e.toString());
			return e.getMessage();
		}

	}

	@CrossOrigin
	@RequestMapping(value = "/fileRead", method = RequestMethod.GET)
	public @ResponseBody String[] fileRead() throws Exception {

		File file = new File("historial.txt");

		FileInputStream fis = null;

		try {
			fis = new FileInputStream(file);
			System.out.println(file.getAbsolutePath());
			System.out.println(file.getPath());
			System.out.println("Total file size to read (in bytes) : " + fis.available());
			String texto = new String();
			int content;
			while ((content = fis.read()) != -1) {
				// convert to char and display it
				texto += (char) content;
			}

			String chat[] = texto.split("\n");

			return chat;

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fis != null)
					fis.close();
			} catch (IOException ex) {
				ex.printStackTrace();
				return null;
			}

		}
		return null;
	}

}
