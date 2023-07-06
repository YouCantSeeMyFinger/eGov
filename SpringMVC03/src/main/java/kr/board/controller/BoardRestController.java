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
	
	/**
	 * ResponseBody 와 RequestBody의 차이점 <br><br>
	 * ResponseBody<br>
	 * 컨트롤러의 메소드의 반환 값이 있을 시 해당 값을 Json형식으로<br>
	 * http 요청의 body 부분에 담아 클라이언트에게 전송한다.<br>
	 * 
	 * 하지만 RequestBody의 경우 클라이언트 쪽에서 받은 데이터를 AJAX통신을 이용하여 서버측으로 전달하는 과정에서
	 * 해당 URI를 처리하는 컨트롤러의 메소드의 파라미터가 객체인 경우 해당 객체의 필드를 확인 후 파라미터 객체의 필드명과 일치하는
	 * 값이 있다면 해당 값을 저장한다.
	 * 
	 * 그리고 가장 큰 차이점은 RequestBody의 target은 파라미터이고 , ResponseBody의 target은 메소드이다.
	 * 
	 * @param vo
	 */
	
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
