package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.rest.client.ChaincodeClient;
import com.oxchains.pharmacy.data.FabricTokenRepo;
import com.oxchains.pharmacy.rest.common.RestResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;

/**
 * @author aiet
 */
@RestController
@RequestMapping("/peer")
public class PeerController {

  private ChaincodeClient chaincodeClient;
  private FabricTokenRepo fabricTokenRepo;

  public PeerController(
      @Autowired ChaincodeClient chaincodeClient,
      @Autowired FabricTokenRepo fabricTokenRepo) {
    this.chaincodeClient = chaincodeClient;
    this.fabricTokenRepo = fabricTokenRepo;
  }

  @GetMapping
  public RestResp peers() {
    return userContext().flatMap(u ->
        fabricTokenRepo.findByUser(u).flatMap(fabricToken -> chaincodeClient.getPeer(fabricToken.getToken()))
    ).map(RestResp::success).orElse(fail());
  }


}
