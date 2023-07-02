package kr.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@PostMapping("/boardInsert.do")
	@ResponseBody
	public void boardInsert(Board vo) {
		log.info("board : {}", vo);
		this.boardMapper.boardInsert(vo);
	}

	@PostMapping("/goDelete.do")
	@ResponseBody
	public void goDelete(@RequestParam("idx") int idx) {
		this.boardMapper.boardDelete(idx);
	}

	@PostMapping("/boardUpdate.do")
	@ResponseBody
	public void boardUpdate(Board vo) {
		log.info("board : {}", vo);
		this.boardMapper.boardUpdate(vo);
	}

	@PostMapping("/boardViewCount")
	@ResponseBody
	public Board boardViewCount(@RequestParam("idx") int idx) {
		this.boardMapper.boardCount(idx);
		Board vo = this.boardMapper.boardContents(idx);
		return vo;
	}

	@GetMapping("/boardContent.do")
	@ResponseBody
	public Board boardContent(@RequestParam("idx") int idx) {
		Board board = this.boardMapper.boardContents(idx);
		log.info("board : {}", board);
		return board;
	}

}
