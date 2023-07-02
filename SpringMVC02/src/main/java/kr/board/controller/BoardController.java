package kr.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.board.entity.Board;
import kr.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BoardController {

	// 생성자 DI
	private final BoardMapper boardMapper;

	@RequestMapping("/")
	public String main() {
		return "home";
	}

	@GetMapping("/boardList.do")
	@ResponseBody
	public List<Board> boardList() {
		List<Board> list = this.boardMapper.getLists();
		return list;
	}

	/**
	 * Js에서 받은 데이터를 Board의 필드에 맞게 바인딩 해주는 작업을 Spring이 알아서 해준다.
	 * @param vo
	 */

	@PostMapping("/boardInsert.do")
	@ResponseBody
	public void boardInsert(Board vo) {
		log.info("board : {}", vo);
		this.boardMapper.boardInsert(vo);
	}

}
