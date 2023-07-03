package kr.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.board.entity.Board;
import kr.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
@RestController
public class BoardRestController {

	// 생성자 DI
	private final BoardMapper boardMapper;

	@GetMapping("/list")
	public List<Board> boardList() {
		List<Board> list = this.boardMapper.getLists();
		return list;
	}

	@PostMapping("/new")
	public void boardInsert(Board vo) {
		log.info("board : {}", vo);
		this.boardMapper.boardInsert(vo);
	}

	// delete
	@DeleteMapping("/{idx}")
	public void goDelete(@PathVariable("idx") int idx) {
		this.boardMapper.boardDelete(idx);
	}

	@PutMapping("/update")
	public void boardUpdate(@RequestBody Board vo) {
		log.info("board : {}", vo);
		this.boardMapper.boardUpdate(vo);
	}

	@PutMapping("/count/{idx}")
	public Board boardViewCount(@PathVariable("idx") int idx) {
		this.boardMapper.boardCount(idx);
		Board vo = this.boardMapper.boardContents(idx);
		return vo;
	}

	@GetMapping("/{idx}")
	public Board boardContent(@PathVariable("idx") int idx) {
		Board board = this.boardMapper.boardContents(idx);
		log.info("board : {}", board);
		return board;
	}

}
